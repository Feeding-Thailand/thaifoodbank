const fb = require("firebase-admin")
const db = fb.firestore()
const deleteDoc = require("../helpers/doDelete")
module.exports = context => {
    const now = new Date()
    now.setMonth(now.getMonth() - 1)
    return db.collection("posts")
        .where("d.active", "==", true)
        .where("d.createdAt", "<", now)
        .get()
        .then(snap => {
            const promises = []
            snap.forEach(post => promises.push(deleteDoc(post.id)))
            return new Promise.all(promises)
        })
}
