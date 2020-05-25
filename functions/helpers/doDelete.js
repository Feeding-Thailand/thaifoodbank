const firebase_tools = require("firebase-tools")
const firebaseToken = require("../secrets/firebaseToken")
const fb = require("firebase-admin")
const db = fb.firestore()
const bucket = fb.storage().bucket()
const deleteDirectory = async directory => {
    const [files] = await bucket.getFiles({ prefix: "/" + directory })
    await Promise.all(files.map(file => file.delete()))
}
module.exports = async id => {
    await Promise.all([
        firebase_tools.firestore.delete(`posts/${id}`, {
            project: process.env.GCLOUD_PROJECT,
            recursive: true,
            yes: true,
            token: firebaseToken,
        }),
        db
            .collection("stats")
            .doc("stats")
            .update({
                currentPosts: fb.firestore.FieldValue.increment(-1),
                deletedPosts: fb.firestore.FieldValue.increment(1),
            }),
        deleteDirectory(id)
    ])
}
