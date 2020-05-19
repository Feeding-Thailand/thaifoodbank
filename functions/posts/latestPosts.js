const fb = require("firebase-admin")
const db = fb.firestore()
module.exports = async (req, res) => {
    try {
        var query = await db
            .collection("posts")
            .orderBy("d.createdAt", "desc")
            .get()
        var data = []
        query.forEach(doc => {
            var temp = doc.data().d
            temp.createdAt = temp.createdAt.toDate()
            data.push({
                data: temp,
                id: doc.id,
            })
        })
        return res.send(data)
    } catch (err) {
        console.log(err)
        return res.status(500).send("error")
    }
}
