const fb = require("firebase-admin")
const db = fb.firestore()
module.exports = async (req, res) => {
    try {
        const id = req.params.id
        if (!id) {
            res.status(400).send("document id not found")
            return
        }
        await db.collection("posts").doc(id).update({
            "d.active": false,
        })
        return res.send("OK")
    } catch (err) {
        console.log(err)
        return res.status(500).send("error")
    }
}
