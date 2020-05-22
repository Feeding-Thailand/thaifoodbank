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
            res.status(404).send("post not found")
            return
        }
        const {
            name,
            description,
            need,
            uid,
            photos,
            placename,
            active,
            donors: donorsCount
        } = snap.data().d
        const donorsSnap = await db.collection("posts").doc(id).collection("donors").orderBy("createdAt","desc").limit(10).get()
        const donors = []
        donorsSnap.forEach(donor => {
            const data = donor.data()
            const createdAt = data.createdAt.toDate()
            data.createdAt = createdAt
            donors.push(data)
        })
        const createdAt = snap.data().d.createdAt.toDate()
        res.send({
            name,
            description,
            need,
            uid,
            photos,
            placename,
            createdAt,
            donors,
            donorsCount,
            active
        })
    } catch (err) {
        console.log(err)
        res.status(500).send("error")
    }
}
