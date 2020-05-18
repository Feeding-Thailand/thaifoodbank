const fb = require("firebase-admin")
const db = fb.firestore()
const { GeoFirestore } = require("geofirestore")
const geofirestore = new GeoFirestore(db)
const geocollection = geofirestore.collection("posts")
const mapboxToken = require("../mapboxToken")
const axios = require("axios")
const mime = require("mime-types")
function base64MimeType(encoded) {
    var result = null
    if (typeof encoded !== "string") return result
    var mime = encoded.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/)
    if (mime && mime.length) result = mime[1]
    return result
}
module.exports = async (req, res) => {
    try {
        var user = await fb.auth().getUser(req.authId)
        user = user.toJSON()
        user = {
            uid: user.uid,
            photoURL: user.photoURL,
            email: user.email,
            displayName: user.displayName,
        }
        const {
            name, // Firstname - Surname
            contact, // Any contact information (tel/addr/line)
            pid, // Personal Identification (National)
            postcode, // Postal Code/Zip Code
            description, // Description (how is your current lifestyle)
            imageDataURL, // DataURL of image as a string, with content mime-type
            need, // What do you need?
        } = req.body
        if (
            Object.keys(user)
                .map(key => {
                    if (user[key] === undefined || user[key] === null)
                        return res
                            .status(400)
                            .send({ status: `key ${key} not found` })
                    else return null
                })
                .filter(val => val !== null).length > 0
        )
            return
        const geocode = await axios.get(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${postcode}.json?access_token=${mapboxToken}&country=TH&types=postcode&language=th`
        )
        const placename = geocode.data.features[0].place_name_th
        if (!placename) {
            res.status(400).send({ status: "geocode failure" })
        }
        const lat = geocode.data.features[0].center[1]
        const lng = geocode.data.features[0].center[0]
        if (!lat || !lng) {
            res.status(400).send({ status: "coordinate failure" })
        }
        const userGeo = new fb.firestore.GeoPoint(Number(lat), Number(lng))
        const mimeType = base64MimeType(imageDataURL)
        if (!mimeType)
            res
                .status(400)
                .send({ status: "image mime type not found or invalid" })
        const extension = mime.extension(mimeType)
        if (extension !== "png" && extension !== "jpg")
            res.status(400).send({ status: "invalid extension" })
        const firestoreSnap = await geocollection.add({
            uid: user.uid,
            name,
            pid,
            need,
            createdAt: new Date(),
            description,
            contact,
            coordinates: userGeo,
            placename,
            matches: [],
        })
        const storageSnap = await storageRef
            .child(toString(snap.id) + extension)
            .putString(imageDataURL, "data_url")
        res.send({ status: "success", firestoreId: firestoreSnap.id, storageId: storageSnap.id })
    } catch (err) {
        console.log(err)
        res.status(500).send("error")
    }
}
