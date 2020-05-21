const fb = require("firebase-admin")
const db = fb.firestore()
module.exports = async (req, res) => {
    try {
        var query = await db
            .collection("posts")
            .where("d.active", "==", true)
            .orderBy("d.createdAt", "asc")
            .orderBy("d.donorsCount", "asc")
            .limit(12)
            .get()
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
                    placename
                },
                id: doc.id,
            })
        })
        return res.send(data)
    } catch (err) {
        console.log(err)
        return res.status(500).send("error")
    }
}
