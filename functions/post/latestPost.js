const fb = require("firebase-admin")
const db = fb.firestore()
module.exports = async (req, res) => {
    try {
        var query = await db
            .collection("posts")
            .where("d.uid", "==", req.authId)
            .orderBy("d.createdAt", "desc")
            .limit(1)
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
        res.send(data.length === 1 ? data[0] : "false")
    } catch (err) {
        console.log(err)
        res.status(500).send("error")
    }
}
