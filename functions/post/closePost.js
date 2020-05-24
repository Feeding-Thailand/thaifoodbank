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
            if (snap.data().d.uid !== req.authId) {
                res.status(403).send("invalid ownership")
            }
            return Promise.all(
                db.collection("posts").doc(id).update({ "d.active": false }),
                db
                    .collection("stats")
                    .doc("stats")
                    .update({
                        activePosts: fb.firestore.FieldValue.increment(-1),
                        closedPosts: fb.firestore.FieldValue.increment(1),
                    })
            )
        })
        .then(() => res.send("OK"))
        .catch(err => {
            console.log(err)
            res.status(500).send("error")
        })
}
