const fb = require('firebase-admin')
const db = fb.firestore()
module.exports = async (req, res) => {
    try {
        const id = req.params.id
        if(!id){
            res.status(400).send('document id not found')
            return
        }
        const { name, isAnonymous } = req.body
        if(isAnonymous === undefined){
            res.status(400).send('document id not found')
            return
        }
        if(isAnonymous === false && !name){
            res.status(400).send('not anonymous but name not found')
            return
        }
        var user = await fb.auth().getUser(req.authId)
        user = user.toJSON()
        user = {
            uid: user.uid,
            photoURL: user.photoURL,
            displayName: isAnonymous ? null : name,
        }
        var snap = await db.collection('posts').doc(id).get()
        if(snap.data().d.donors.findIndex(el => el.uid === user.uid) !== -1){
            res.status(409).send('user already donated')
            return
        }
        db.collection('posts').doc(id).update({
            'd.donors': fb.firestore.FieldValue.arrayUnion(user)
        })
        return res.send('OK')
    }
    catch (err) {
        console.log(err)
        return res.status(500).send('error')
    }
}