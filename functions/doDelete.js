const firebase_tools = require("firebase-tools")
const firebaseToken = require("./firebaseToken")
const fb = require("firebase-admin")
const db = fb.firestore()
module.exports = async (id) => {
    await firebase_tools.firestore.delete(`posts/${id}`, {
        project: process.env.GCLOUD_PROJECT,
        recursive: true,
        yes: true,
        token: firebaseToken,
    })
    db.collection("stats")
        .doc("stats")
        .update({
            currentPosts: fb.firestore.FieldValue.increment(-1),
            deletedPosts: fb.firestore.FieldValue.increment(1),
        })
}
