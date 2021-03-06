const fb = require("firebase-admin")
const db = fb.firestore()
module.exports = async (req, res) => {
    const backgroundPromises = []
    try {
        const id = req.params.id
        if (!id) {
            res.status(400).send("document id not found")
            return
        }
        const querySnap = await db
            .collection("posts")
            .doc(id)
            .collection("donors")
            .where("uid", "==", req.authId)
            .get()
        if (querySnap.empty) {
            res.status(409).send("no donation record found")
            return
        }
        if (querySnap.size > 1) {
            res.status(500).send("duplicate donation record found")
            return
        }
        let did = undefined
        querySnap.forEach(doc => {
            did = doc.id
        })
        backgroundPromises.push(
            db
                .collection("posts")
                .doc(id)
                .collection("donors")
                .doc(did)
                .delete()
        )
        backgroundPromises.push(
            db
                .collection("posts")
                .doc(id)
                .update({
                    "d.donors": fb.firestore.FieldValue.increment(-1),
                })
        )
        const statsSnap = await db
            .collection("stats")
            .doc("stats")
            .collection("donors")
            .where("uid", "==", req.authId)
            .get()
        if (statsSnap.empty) {
            res.status(500).send("stats not found")
            return
        } else if (statsSnap.size > 1) {
            res.status(500).send("stats duplicate")
            return
        } else {
            if (statsSnap.donationCount === 0) {
                statsSnap.forEach(donor =>
                    backgroundPromises.push(
                        db
                            .collection("stats")
                            .doc("stats")
                            .collection("donors")
                            .doc(donor.id)
                            .delete()
                    )
                )
                backgroundPromises.push(
                    db
                        .collection("stats")
                        .doc("stats")
                        .update({
                            donors: fb.firestore.FieldValue.increment(-1),
                        })
                )
            } else {
                statsSnap.forEach(donor =>
                    backgroundPromises.push(
                        db
                            .collection("stats")
                            .doc("stats")
                            .collection("donors")
                            .doc(donor.id)
                            .update({
                                donationCount: fb.firestore.FieldValue.increment(
                                    -1
                                ),
                            })
                    )
                )
            }
        }
        await Promise.all(backgroundPromises)
        res.send("OK")
    } catch (err) {
        console.log(err)
        res.status(500).send("error")
    }
}
