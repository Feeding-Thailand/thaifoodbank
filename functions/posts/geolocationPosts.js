const fb = require("firebase-admin")
const db = fb.firestore()
const { GeoFirestore } = require("geofirestore")
const geofirestore = new GeoFirestore(db)
const geocollection = geofirestore.collection("posts")
module.exports = async (req, res) => {
    try {
        if (req.params.lng < -180 || req.params.lng > 180) {
            res.status(400).send("longitude out of range")
            return
        }
        if (req.params.lat < -90 || req.params.lat > 90) {
            res.status(400).send("latitude out of range")
            return
        }
        const userGeo = new fb.firestore.GeoPoint(
            Number(req.params.lat),
            Number(req.params.lng)
        )
        const query = geocollection
            .near({
                center: userGeo,
                radius: Number(req.params.radius),
            })
            .where("active", "==", true)
            .limit(12)
        var snap = await query.get()
        snap = snap.docs
        var payload = []
        snap.forEach(doc => {
            var data = doc.data()
            const { name, need, uid, photos, placename } = data
            const createdAt = data.createdAt.toDate()
            payload.push({
                data: {
                    name,
                    need,
                    uid,
                    photos,
                    createdAt,
                    placename,
                },
                distance: doc.distance,
                id: doc.id,
            })
        })
        res.send(payload)
    } catch (err) {
        console.log(err)
        res.status(500).send("error")
    }
}
