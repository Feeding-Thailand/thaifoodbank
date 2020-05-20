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
        if (!snap.exists) {
            req.status(404).send("post not found")
            return
        }
        const {
            name,
            description,
            need,
            uid,
            photos,
            placename,
        } = snap.data().d
        const createdAt = snap.data().d.createdAt.toDate()
        res.send({
            name,
            description,
            need,
            uid,
            photos,
            placename,
            createdAt,
        })
    } catch (err) {
        console.log(err)
        res.status(500).send("error")
    }
}
