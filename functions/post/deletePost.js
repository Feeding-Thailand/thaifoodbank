const fb = require("firebase-admin")
const db = fb.firestore()
const deleteDoc = require("../doDelete")
module.exports = async (req, res) => {
    try {
        const id = req.params.id
        if (!id) {
            res.status(400).send("document id not found")
            return
        }
        const snap = await db.collection("posts").doc(id).get()
        if (!snap.exists) {
            res.status(404).send("document not found, maybe already deleted")
            return
        }
        if (snap.data().d.uid !== req.authId) {
            res.status(403).send("invalid ownership")
            return
        }
        await deleteDoc(id)
        res.send("OK")
    } catch (err) {
        console.log(err)
        res.status(500).send("error")
    }
}
