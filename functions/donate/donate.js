const fb = require("firebase-admin")
const db = fb.firestore()
module.exports = async (req, res) => {
    console.log(req)
    const id = req.params.id
    if (!id) {
        res.status(400).send("document id not found")
        return
    }
    const { name, isAnonymous } = req.body
    if (isAnonymous === undefined) {
        res.status(400).send("isAnonymous not found")
        return
    }
    if (isAnonymous === false && !name) {
        res.status(400).send("not anonymous but name not found")
        return
    }
    fb.auth()
        .getUser(req.authId)
        .then(user => {
            user = user.toJSON()
            user = {
                uid: user.uid,
                photoURL: user.photoURL,
                displayName: isAnonymous ? null : name,
                createdAt: new Date(),
            }
            return Promise.all([user, db.collection("posts").doc(id).collection("donors").where("uid", "==", user.uid).get()])
        })
        .then(([user, snap]) => {
            if (!snap.empty) {
                res.status(409).send("user already donated")
            }
            return Promise.all([user, db.collection("stats").doc("stats").collection("donors").where("uid", "==", user.uid).get()])
        })
        .then(([user, statsSnap]) => {
            const promises = []
            if (statsSnap.size > 1) {
                res.status(500).send("duplicate uid found in database")
            } else if (statsSnap.empty) {
                promises.push(
                    db.collection("stats").doc("stats").collection("donors").add({
                        uid: user.uid,
                        donationCount: 1,
                    })
                )
                promises.push(
                    db
                        .collection("stats")
                        .doc("stats")
                        .update({
                            donors: fb.firestore.FieldValue.increment(1),
                        })
                )
            } else {
                statsSnap.forEach(doc => {
                    promises.push(
                        db
                            .collection("stats")
                            .doc("stats")
                            .collection("donors")
                            .doc(doc.id)
                            .update({
                                donationCount: fb.firestore.FieldValue.increment(1),
                            })
                    )
                })
            }
            promises.push(db.collection("posts").doc(id).collection("donors").add(user))
            promises.push(
                db
                    .collection("posts")
                    .doc(id)
                    .update({
                        "d.donors": fb.firestore.FieldValue.increment(1),
                    })
            )
            delete user.createdAt
            promises.push(
                db
                    .collection("transactions")
                    .orderBy("id", "desc")
                    .limit(1)
                    .get()
                    .then(transactionsSnap => {
                        let currentTransactionId = 1
                        if (!transactionsSnap.empty) transactionsSnap.forEach(transaction => (currentTransactionId = transcation.data().id + 1))
                        return db.collection("transactions").add({
                            id: currentTransactionId,
                            donor: user,
                            createdAt: new Date(),
                            post: id,
                        })
                    })
            )
            return Promise.all(promises)
        })
        .then(() => res.send("OK"))
        .catch(err => {
            console.log(err)
            res.status(500).send("error")
        })
}
