const fb = require("firebase-admin")
const db = fb.firestore()
module.exports = async (req, res) => {
    const lastdocId = req.query.lastVisible
    const initPromise = lastdocId
        ? db
              .collection("posts")
              .doc(lastdocId)
              .get()
              .then(docSnap => {
                  return db.collection("posts").where("d.active", "==", true).orderBy("d.createdAt", "asc").startAfter(docSnap).limit(12).get()
              })
        : db.collection("posts").where("d.active", "==", true).orderBy("d.createdAt", "asc").limit(12).get()
    return initPromise
        .then(query => {
            const data = []
            query.forEach(doc => {
                const temp = doc.data().d
                const { name, need, uid, photos, placename } = temp
                const createdAt = temp.createdAt.toDate()
                data.push({
                    data: {
                        name,
                        need,
                        uid,
                        photos,
                        createdAt,
                        placename,
                    },
                    id: doc.id,
                })
            })
            res.send(data)
        })
        .catch(err => {
            console.log(err)
            res.status(500).send("error")
        })
}
