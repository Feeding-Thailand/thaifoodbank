const fb = require("firebase-admin")
const db = fb.firestore()
module.exports = async (req, res) => {
    try {
        const id = req.params.id
        if (!id) {
            res.status(400).send("document id not found")
            return
        }
        var snap = await db.collection("posts").doc(id).get()
        const { contact } = snap.data().d
        const donorsSnap = await db.collection("posts").doc(id).collection("donors").where("uid","==",req.authId).get()
        const isAlreadyDonated = !donorsSnap.empty
        res.send({ contact, isAlreadyDonated })
    } catch (err) {
        console.log(err)
        res.status(500).send("error")
    }
}
