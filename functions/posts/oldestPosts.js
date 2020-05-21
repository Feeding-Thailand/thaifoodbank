const fb = require("firebase-admin")
const db = fb.firestore()
module.exports = async (req, res) => {
    try {
        const lastdocId = req.query.latestVisible
        let fpart = await db
            .collection("posts")
            .orderBy("d.createdAt", "asc")
            .where("d.active", "==", true)
        if (lastdocId) fpart = fpart.startAfter(lastdocId)
        const query = fpart.limit(12).get()
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
