const fb = require('firebase-admin')
const db = fb.firestore()
const { GeoFirestore } = require('geofirestore')
const geofirestore = new GeoFirestore(db)
const geocollection = geofirestore.collection('help-harbor')
module.exports = async (req, res) => {
    try {
        const userGeo = new admin.firestore.GeoPoint(Number(req.params.lat), Number(req.params.lng))
        const query = geocollection.near({ center: userGeo, radius: Number(req.params.radius) })
        var snap = await query.get()
        snap = snap.docs
        var payload = []
        snap.forEach((doc, index) => {
            var data = doc.data()
            delete data.coordinates
            data.createdAt = data.createdAt.toDate()
            if (!data.matches.includes(req.authId)) {
                payload.push({
                    data: data,
                    distance: snap[index].distance,
                    id: doc.id
                })
            }
        })
        return res.send(payload)
    }
    catch (err) {
        console.log(err)
        return res.status(500).send('error')
    }
}