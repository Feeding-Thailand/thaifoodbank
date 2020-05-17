const fb = require('firebase-admin')
const db = fb.firestore()
const { GeoFirestore } = require('geofirestore')
const geofirestore = new GeoFirestore(db)
const geocollection = geofirestore.collection('help-harbor')
const mapboxToken = 'pk.eyJ1IjoidG93bmhhbGwtdGgiLCJhIjoiY2s3bXljdnlqMG5oZTNlb21ucW9qa2RjdyJ9.ybyfBHJyroub6rS-bVh1gQ'
const axios = require('axios')
module.exports = async (req, res) => {
    try {
        var user = await fb.auth().getUser(req.authId)
        user = user.toJSON()
        user = {
            uid: user.uid,
            photoURL: user.photoURL,
            email: user.email,
            displayName: user.displayName
        }
        Object.keys(user).forEach(key => user[key] === undefined ? delete user[key] : {})
        var userGeo = new admin.firestore.GeoPoint(Number(req.body.geopoint.lat), Number(req.body.geopoint.lng))
        var geocode = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${req.body.geopoint.lng},${req.body.geopoint.lat}.json?access_token=${mapboxToken}&types=place&language=th`)
        geocode = geocode.data.features[0].place_name_th
        if (!geocode) {
            return res.status(400).send({ status: 'geocode failure' })
        }
        var snap = await geocollection.add({
            author: user,
            uid: user.uid,
            createdAt: new Date(),
            description: req.body.description,
            contact: req.body.contact,
            coordinates: userGeo,
            geocode: geocode,
            matches: []
        })
        return res.send({ status: 'success', id: snap.id })
    }
    catch (err) {
        console.log(err)
        return res.status(500).send('error')
    }
}