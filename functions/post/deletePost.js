const fb = require("firebase-admin")
const db = fb.firestore()
module.exports = async (req, res) => {
    try {
        const id = req.params.id
        if (!id) {
            res.status(400).send("document id not found")
            return
        }
        const snap = await db.collection("posts").doc(id).get()
        if (snap.data().d.uid !== req.authId) {
            res.status(403).send("invalid ownership")
            return
        }
        await db.collection("posts").doc(id).delete()
        db.collection("stats")
            .doc("stats")
            .update({
                currentPosts: fb.firestore.FieldValue.increment(-1),
                deletedPosts: fb.firestore.FieldValue.increment(1),
            })
        res.send("OK")
    } catch (err) {
        console.log(err)
        res.status(500).send("error")
    }
}
