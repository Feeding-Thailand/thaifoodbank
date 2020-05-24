const fb = require("firebase-admin")
const db = fb.firestore()
module.exports = (req, res) => {
    return db
        .collection("posts")
        .orderBy("d.createdAt", "desc")
        .where("d.active", "==", true)
        .limit(12)
        .get()
        .then(query => {
            var data = []
            query.forEach(doc => {
                var temp = doc.data().d
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
