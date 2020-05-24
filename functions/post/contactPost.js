const fb = require("firebase-admin")
const db = fb.firestore()
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
            const { contact } = snap.data().d
            return Promise.all([contact, db.collection("posts").doc(id).collection("donors").where("uid", "==", req.authId).get()])
        })
        .then(([contact, donorsSnap]) => {
            const isAlreadyDonated = !donorsSnap.empty
            res.send({ contact, isAlreadyDonated })
        })
        .catch(err => {
            console.log(err)
            res.status(500).send("error")
        })
}
