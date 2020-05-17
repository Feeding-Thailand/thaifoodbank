import firebase from 'firebase/app'
import "firebase/auth"
import "firebase/firestore"
import "firebase/storage"

const config = {
    apiKey: "AIzaSyAPZRVZklP_UcCHola-iuJ0P24BZzlA4xg",
    authDomain: "townhall-th.firebaseapp.com",
    databaseURL: "https://townhall-th.firebaseio.com",
    projectId: "townhall-th",
    storageBucket: "townhall-th.appspot.com",
    messagingSenderId: "848768442775",
    appId: "1:848768442775:web:bd884398be0a442b6fe4d2",
    measurementId: "G-6HC6EMHGSM"
}

try {
    firebase.initializeApp(config)
}

catch (err) {

}
export default firebase