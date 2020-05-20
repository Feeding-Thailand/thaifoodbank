const fb = require("firebase-admin")
const db = fb.firestore()
module.exports = async (req, res) => {
    try {
        var user = await fb.auth().getUser(req.authId)
        user = user.toJSON()
        var query = await db
            .collection("posts")
            .where("d.uid", "==", user.uid)
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
        return res.send(data.length === 1 ? data[0] : "false")
    } catch (err) {
        console.log(err)
        return res.status(500).send("error")
    }
}
