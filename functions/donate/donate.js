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
        }
        var snap = await db.collection("posts").doc(id).get()
        if (snap.data().d.donors.findIndex(el => el.uid === user.uid) !== -1) {
            res.status(409).send("user already donated")
            return
        }
        db.collection("posts")
            .doc(id)
            .update({
                "d.donors": fb.firestore.FieldValue.arrayUnion(user),
            })
        const statsSnap = await db.collection("stats").doc("stats").get()
        if (statsSnap.data().donorsList.indexOf(user.uid) === -1) {
            db.collection("stats")
                .doc("stats")
                .update({
                    donors: fb.firestore.FieldValue.increment(1),
                    donorsList: fb.firestore.FieldValue.arrayUnion(user.uid),
                })
        }
        res.send("OK")
    } catch (err) {
        console.log(err)
        res.status(500).send("error")
    }
}
