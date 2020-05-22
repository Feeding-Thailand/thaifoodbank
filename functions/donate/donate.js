const fb = require("firebase-admin")
const db = fb.firestore()
module.exports = async (req, res) => {
    try {
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
        var user = await fb.auth().getUser(req.authId)
        user = user.toJSON()
        user = {
            uid: user.uid,
            photoURL: user.photoURL,
            displayName: isAnonymous ? null : name,
            createdAt: new Date(),
        }
        const snap = await db
            .collection("posts")
            .doc(id)
            .collection("donors")
            .where("uid", "==", user.uid)
            .get()
        if (!snap.empty) {
            res.status(409).send("user already donated")
            return
        }
        db.collection("posts").doc(id).collection("donors").add(user)
        db.collection("posts")
            .doc(id)
            .update({
                "d.donors": fb.firestore.FieldValue.increment(1),
            })
        const statsSnap = await db
            .collection("stats")
            .doc("stats")
            .collection("donors")
            .where("uid", "==", user.uid)
            .get()
        if (statsSnap.empty) {
            db.collection("stats").doc("stats").collection("donors").add({
                uid: user.uid,
                donationCount: 1,
            })
            db.collection("stats")
                .doc("stats")
                .update({ donors: fb.firestore.FieldValue.increment(1) })
        } else if (statsSnap.size > 1) {
            res.status(500).send("duplicate uid found in database")
        } else {
            statsSnap.forEach(doc => {
                db.collection("stats")
                    .doc("stats")
                    .collection("donors")
                    .doc(doc.id)
                    .update({
                        donationCount: fb.firestore.FieldValue.increment(1),
                    })
            })
        }
        delete user.createdAt
        const transactionsSnap = await db
            .collection("transactions")
            .orderBy("id", "desc")
            .limit(1)
            .get()
        let currentTransactionId = 1
        if (!transactionsSnap.empty)
            transactionsSnap.forEach(
                transaction =>
                    (currentTransactionId = transaction.data().id + 1)
            )
        db.collection("transactions").add({
            id: currentTransactionId,
            donor: user,
            createdAt: new Date(),
            post: id,
        })
        res.send("OK")
    } catch (err) {
        console.log(err)
        res.status(500).send("error")
    }
}
