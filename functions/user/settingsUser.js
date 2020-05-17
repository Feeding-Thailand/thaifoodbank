const fb = require('firebase-admin')
const db = fb.firestore()
module.exports = async (req, res) => {
    try {
        var snap = await db.collection('users').doc(req.authId).get()
        if (!snap.exists) {
            return res.status(404).send('not found')
        }
        return res.status(200).send();
    }
    catch (err) {
        console.log(err)
        return res.status(500).send('error')
    }
}