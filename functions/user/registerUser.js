const fb = require("firebase-admin")
const db = fb.firestore()
const storageRef = fb.storage().ref()
module.exports = async (req, res) => {
    try {
        const {
            name, // Firstname - Surname
            contact, // Any contact information (tel/addr/line)
            pid, // Personal Identification (National)
            postcode, // Postal Code/Zip Code
            description, // Description (how is your current lifestyle)
            imageDataURL, // DataURL of image as a string
            need, // What do you need
        } = req.body
        if(!name || !contact || !pid || !postcode || !description || !imageDataURL || !need) return res.status(400).send('invalid request')
        db.collection("users").doc(req.authId).set({
            name,
            contact,
            pid,
            postcode,
            description,
            need
        })
        const snap = await storageRef.putString(imageDataURL, 'data_url')
        return res.status(200).send()
    } catch (err) {
        console.log(err)
        return res.status(500).send("error")
    }
}
