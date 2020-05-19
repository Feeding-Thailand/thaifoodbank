const fb = require('firebase-admin')
const db = fb.firestore()
module.exports = async (req, res) => {
    try {
        const id = req.params.id
        var snap = await db.collection('posts').doc(id).get()
        const { name, description, need, uid, photos, placename } = snap.data().d
        const createdAt = snap.data().d.createdAt.toDate()
        return res.send({ name, description, need, uid, photos, placename, createdAt })
    }
    catch (err) {
        console.log(err)
        return res.status(500).send('error')
    }
}