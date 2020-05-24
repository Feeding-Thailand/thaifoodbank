const fb = require("firebase-admin")
const db = fb.firestore()
module.exports = async (req, res) => {
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
            if (!snap.exists) {
                res.status(404).send("post not found")
            }
            const { name, description, need, uid, photos, placename, active, donors: donorsCount } = snap.data().d
            const dat = { name, description, need, uid, photos, placename, active, donorsCount, createdAt: snap.data().d.createdAt.toDate() }
            return Promise.all(dat, db.collection("posts").doc(id).collection("donors").orderBy("createdAt", "desc").limit(10).get())
        })
        .then(([dat, donorsSnap]) => {
            const donors = []
            donorsSnap.forEach(donor => {
                const data = donor.data()
                data.createdAt = data.createdAt.toDate()
                donors.push(data)
            })
            dat.donors = donors
            res.send(dat)
        })
        .catch(err => {
            console.log(err)
            res.status(500).send("error")
        })
}
