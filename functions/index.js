const firebase = require("firebase-admin");
firebase.initializeApp({
    storageBucket: "thaifoodbank.appspot.com"
});
const functions = require("firebase-functions")
const post = require("./post")
const posts = require("./posts")
const donate = require("./donate")
exports.post = functions.region("asia-east2").https.onRequest(post)
exports.posts = functions.region("asia-east2").https.onRequest(posts)
exports.donate = functions.region("asia-east2").https.onRequest(donate)