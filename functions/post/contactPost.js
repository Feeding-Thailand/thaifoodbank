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
        const { contact, donors } = snap.data().d
        const isAlreadyDonated = donors.findIndex(donor => donor.uid === req.authId) !== -1
        res.send({ contact, isAlreadyDonated })
    } catch (err) {
        console.log(err)
        res.status(500).send("error")
    }
}
