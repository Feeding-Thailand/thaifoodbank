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
        .collection("donors")
        .where("uid", "==", req.authId)
        .get()
        .then(querySnap => {
            if (querySnap.empty) {
                res.status(409).send("no donation record found")
            }
            if (querySnap.size > 1) {
                res.status(500).send("duplicate donation record found")
            }
            let did = undefined
            querySnap.forEach(doc => {
                did = doc.id
            })
            const deleteDonorFromListInPostsPromise = db.collection("posts").doc(id).collection("donors").doc(did).delete()
            const updateDonorsCountFromListInPostsPromise = db
                .collection("posts")
                .doc(id)
                .update({
                    "d.donors": fb.firestore.FieldValue.increment(-1),
                })
            const continuePromise = db
                .collection("stats")
                .doc("stats")
                .collection("donors")
                .where("uid", "==", req.authId)
                .get()
                .then(statsSnap => {
                    if (statsSnap.empty) {
                        res.status(500).send("stats not found")
                    } else if (statsSnap.size > 1) {
                        res.status(500).send("stats duplicate")
                    } else {
                        if (statsSnap.donationCount === 0) {
                            statsSnap.forEach(donor => db.collection("stats").doc("stats").collection("donors").doc(donor.id).delete())
                            db.collection("stats")
                                .doc("stats")
                                .update({
                                    donors: fb.firestore.FieldValue.increment(-1),
                                })
                        } else {
                            statsSnap.forEach(donor =>
                                db
                                    .collection("stats")
                                    .doc("stats")
                                    .collection("donors")
                                    .doc(donor.id)
                                    .update({
                                        donationCount: fb.firestore.FieldValue.increment(-1),
                                    })
                            )
                        }
                    }
                    res.send("OK")
                })
            // These three tasks can run asynchronously simultaneously.
            return Promise.all(deleteDonorFromListInPostsPromise, updateDonorsCountFromListInPostsPromise, continuePromise)
        })
        .catch(err => {
            console.log(err)
            res.status(500).send("error")
        })
}
