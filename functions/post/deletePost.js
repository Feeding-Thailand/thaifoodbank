const fb = require("firebase-admin")
const db = fb.firestore()
const deleteDoc = require("../helpers/doDelete")
module.exports = (req, res) => {
    const id = req.params.id
    if (!id) {
        res.status(400).send("document id not found")
        return
    }
    return db
        .collection("posts")
        .doc(id)
        .get()
        .then(snap => {
            if (!snap.exists) {
                res.status(404).send("document not found, maybe already deleted")
            } else if (snap.data().d.uid !== req.authId) {
                res.status(403).send("invalid ownership")
            }
            return deleteDoc(id)
        })
        .then(() => res.send("OK"))
        .catch(err => {
            console.log(err)
            res.status(500).send("error")
        })
}
