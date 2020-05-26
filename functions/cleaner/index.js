const fb = require("firebase-admin")
const db = fb.firestore()
const deleteDoc = require("../helpers/doDelete")
module.exports = async context => {
    const now = new Date()
    now.setMonth(now.getMonth() - 1)
    const snap = await db.collection("posts").where("d.active","==",true).where("d.createdAt","<", now).get()
    const promises = []
    snap.forEach(post => promises.push(deleteDoc(post.id)))
    await Promise.all(promises)
    return null
}
