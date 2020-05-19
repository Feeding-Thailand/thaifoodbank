const fb = require('firebase-admin')
const db = fb.firestore()
module.exports = async (req, res) => {
    try {
        const id = req.params.id
        var snap = await db.collection('posts').doc(id).get()
        const { name, description, need, uid, photos } = snap.data().d
        return res.send({ name, description, need, uid, photos })
    }
    catch (err) {
        console.log(err)
        return res.status(500).send('error')
    }
}