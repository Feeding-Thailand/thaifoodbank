const fb = require('firebase-admin')
const db = fb.firestore()
module.exports = async (req, res) => {
    try {
        const id = req.params.id
        var snap = await db.collection('help-harbor').doc(id).get()
        var contact = snap.data().d.contact
        return res.send({ contact: contact })
    }
    catch (err) {
        console.log(err)
        return res.status(500).send('error')
    }
}