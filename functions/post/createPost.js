const fb = require("firebase-admin")
const fs = require("fs")
const os = require("os")
const path = require("path")
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
const bucket = fb.storage().bucket()
const writeFile = async (base64Raw, fname) => {
    const fpath = path.join(os.tmpdir(), fname)
    const base64Data = base64Raw.replace(/^data:image\/png;base64,/, "")
    await new Promise(res =>
        fs.writeFile(fpath, base64Data, "base64", err => {
            console.log(err)
            res()
        })
    )
    await bucket.upload(fpath)
}
const validatePID = (pid) => {
    if(pid.length !== 13) return false;
    let checksum = 0
    for(let i = 0; i < 13; i++){
        checksum += toInt(pid[i]) * (i+1)
    }
    checksum %= 11
    checksum = (11 - checksum) % 10
    return toInt(pid[12]) === checksum
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
                    if (
                        user[key] === undefined ||
                        user[key] === null ||
                        !(user[key] instanceof String)
                    )
                        return res
                            .status(400)
                            .send({ status: `key ${key} not found` })
                    else return null
                })
                .filter(val => val !== null).length > 0
        )
            return
        if (!validatePID(pid)) {
            res.status(400).send({ status: "invalid pid" })
            return
        }
        const geocode = await axios.get(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${postcode}.json?access_token=${mapboxToken}&country=TH&types=postcode&language=th`
        )
        const features = geocode.data.features.filter(feature => 
            feature.text_th === postcode
        )
        if (!features || features.empty) {
            res.status(400).send({ status: "postcode not found" })
            return
        }
        const placename = features[0].place_name_th
        if (!placename) {
            res.status(400).send({ status: "geocode failure" })
            return
        }
        const lat = features[0].center[1]
        const lng = features[0].center[0]
        if (!lat || !lng) {
            res.status(400).send({ status: "coordinate failure" })
            return
        }
        const userGeo = new fb.firestore.GeoPoint(Number(lat), Number(lng))
        const mimeType = base64MimeType(imageDataURL)
        if (!mimeType) {
            res.status(400).send({
                status: "image mime type not found or invalid",
            })
            return
        }
        const extension = mime.extension(mimeType)
        if (extension !== "png" && extension !== "jpg") {
            res.status(400).send({ status: "invalid extension" })
            return
        }
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
        await writeFile(
            imageDataURL,
            toString(firestoreSnap.id) + "." + extension
        )
        res.send({ status: "success", firestoreId: firestoreSnap.id })
    } catch (err) {
        console.log(err)
        res.status(500).send("error")
    }
}
