const fb = require("firebase-admin")
const fs = require("fs")
const os = require("os")
const path = require("path")
const db = fb.firestore()
const { GeoFirestore } = require("geofirestore")
const geofirestore = new GeoFirestore(db)
const geocollection = geofirestore.collection("posts")
const mapboxToken = require("../secrets/mapboxToken")
const axios = require("axios")
const mime = require("mime-types")
const formatImage = require("../helpers/formatImage")
function base64MimeType(encoded) {
    var result = null
    if (typeof encoded !== "string") return result
    var mime = encoded.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/)
    if (mime && mime.length) result = mime[1]
    return result
}
const bucket = fb.storage().bucket()
const writeFile = async (base64Raw, fname, iname, tname) => {
    const fpath = path.join(os.tmpdir(), fname)
    const ipath = path.join(os.tmpdir(), iname)
    const base64Data = base64Raw
        .replace(/^data:image\/png;base64,/, "")
        .replace(/^data:image\/jpeg;base64,/, "")
    console.log(base64Data)
    await new Promise(res =>
        fs.writeFile(fpath, base64Data, "base64", err => {
            console.log(err)
            res()
        })
    )
    await formatImage(fpath, ipath)
    console.log(fpath, ipath)
    await bucket.upload(ipath, {
        destination: tname,
    })
}
const writeFiles = async (files, docname) => {
    if (!fs.existsSync(path.join(os.tmpdir(), docname))) {
        fs.mkdirSync(path.join(os.tmpdir(), docname))
    }
    await Promise.all(
        files.map((file, idx) => {
            return writeFile(
                file[0],
                path.join(docname, `${idx + 1}.${file[1]}`),
                path.join(docname, `${idx + 1}-out.jpg`),
                path.join(docname, `${idx + 1}.jpg`)
            )
        })
    )
}
const validatePID = pid => {
    if (pid.length !== 13) return false
    let checksum = 0
    for (let i = 0; i < 12; i++) {
        checksum += parseInt(pid[i]) * (13 - i)
    }
    checksum %= 11
    checksum = (11 - checksum) % 10
    return parseInt(pid[12]) === checksum
}
module.exports = async (req, res) => {
    try {
        const preSnap = await db
            .collection("posts")
            .where("d.uid", "==", req.authId)
            .get()
        if (preSnap.size > 0) {
            res.status(409).send({
                error: "user already created a post",
                status: 703
            })
            return
        }
        const extractedBody = (({
            name, // Firstname - Surname
            contact, // Any contact information (tel/addr/line)
            pid, // Personal Identification (National)
            postcode, // Postal Code/Zip Code
            description, // Description (how is your current lifestyle)
            imageDataURL, // DataURL of image as a string, with content mime-type
            need, // What do you need?
        }) => ({
            name, // Firstname - Surname
            contact, // Any contact information (tel/addr/line)
            pid, // Personal Identification (National)
            postcode, // Postal Code/Zip Code
            description, // Description (how is your current lifestyle)
            imageDataURL, // DataURL of image as a string, with content mime-type
            need, // What do you need?
        }))(req.body)
        if (
            Object.keys(extractedBody)
                .map(key => {
                    if (
                        extractedBody[key] === undefined ||
                        extractedBody[key] === null
                    ) {
                        res.status(400).send({
                            error: `key ${key} not found, val = ${extractedBody[key]}`,
                        })
                        return true
                    } else return null
                })
                .filter(val => val !== null).length > 0
        )
            return
        const {
            name, // Firstname - Surname
            contact, // Any contact information (tel/addr/line)
            pid, // Personal Identification (National)
            postcode, // Postal Code/Zip Code
            description, // Description (how is your current lifestyle)
            imageDataURL, // DataURL of image as a string, with content mime-type
            need, // What do you need?
        } = extractedBody
        if (!validatePID(pid)) {
            res.status(400).send({ error: "invalid pid", status: 700 })
            return
        }
        const preSnap2 = await db
            .collection("posts")
            .where("d.pid", "==", pid)
            .get()
        if (preSnap2.size > 0) {
            res.status(409).send({ error: "user has same pid with someone else", status: 700 })
            return
            // remark: if there are people with fake pids, this might be a big problem to acceptors
            // maybe need further checking process (i.e. ID card photo validation)
        }
        const geocode = await axios.get(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${postcode}.json?access_token=${mapboxToken}&country=TH&types=postcode&language=th`
        )
        const features = geocode.data.features.filter(
            feature => feature.text_th === postcode
        )
        if (!features || features.length === 0) {
            res.status(400).send({ error: "postcode not found", status: 701 })
            return
        }
        const placename = features[0].place_name_th
        if (!placename) {
            res.status(400).send({ error: "geocode failure", status: 701 })
            return
        }
        const lat = features[0].center[1]
        const lng = features[0].center[0]
        if (!lat || !lng) {
            res.status(400).send({ error: "coordinate failure", status: 701 })
            return
        }
        const userGeo = new fb.firestore.GeoPoint(Number(lat), Number(lng))

        const parsedImages = imageDataURL
            .map(imgd => {
                const mimeType = base64MimeType(imgd)
                if (!mimeType) {
                    res.status(400).send({
                        status: 702,
                        error: "image mime type not found or invalid",
                    })
                    return false
                }
                let extension = mime.extension(mimeType)
                if (extension === "jpeg") extension = "jpg"
                if (extension !== "png" && extension !== "jpg") {
                    res.status(400).send({
                        status: 702,
                        error: "invalid extension"
                    })
                    return false
                }
                return [imgd, extension]
            })
            .filter(ret => ret !== false)
        if (parsedImages.length !== imageDataURL.length) return
        const firestoreSnap = await geocollection.add({
            uid: req.authId,
            name,
            pid,
            need,
            createdAt: new Date(),
            description,
            contact,
            coordinates: userGeo,
            placename,
            active: true,
            donors: 0,
            photos: parsedImages.length
        })
        await Promise.all([
            writeFiles(parsedImages, firestoreSnap.id),
            db.collection("stats")
            .doc("stats")
            .update({
                allPosts: fb.firestore.FieldValue.increment(1),
                activePosts: fb.firestore.FieldValue.increment(1),
                currentPosts: fb.firestore.FieldValue.increment(1),
            })
        ])
        res.send({
            status: "success",
            firestoreId: firestoreSnap.id,
        })
    } catch (err) {
        console.log(err)
        res.status(500).send("error")
    }
}
