const firebase = require("firebase-admin");
firebase.initializeApp({
    storageBucket: "thaifoodbank.appspot.com"
});
const functions = require("firebase-functions")
const post = require("./post")
const posts = require("./posts")
const user = require("./user")
exports.post = functions.region("asia-east2").https.onRequest(post)
exports.posts = functions.region("asia-east2").https.onRequest(posts)
exports.user = functions.region("asia-east2").https.onRequest(user)