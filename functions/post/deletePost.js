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
        res.send("deleted")
    } catch (err) {
        console.log(err)
        res.status(500).send("error")
    }
}
