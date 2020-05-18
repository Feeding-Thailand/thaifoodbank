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
            extension, // File extension (JPG, PNG) only 
        } = req.body
        if(extension && imageDataURL){
            extension = extension.toLowerCase()
            if(extension !== 'png' && extension !== 'jpg') return res.status(400).send('invalid extension')
            const snap = await storageRef.child(toString(req.authId) + extension).putString(imageDataURL, 'data_url')
        }
        //if(!name || !contact || !pid || !postcode || !description || !imageDataURL || !need) return res.status(400).send('invalid request')
        db.collection("users").doc(req.authId).update({
            name,
            contact,
            pid,
            postcode,
            description,
        })
        return res.status(200).send()
    } catch (err) {
        console.log(err)
        return res.status(500).send("error")
    }
}
