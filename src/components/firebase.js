import firebase from "firebase/app"
import "firebase/analytics"
import "firebase/auth"
import "firebase/firestore"
import "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyAui3KOHr9WURfZjvFLn3c9xmSHhylt3Xo",
    authDomain: "thaifoodbank.firebaseapp.com",
    databaseURL: "https://thaifoodbank.firebaseio.com",
    projectId: "thaifoodbank",
    storageBucket: "thaifoodbank.appspot.com",
    messagingSenderId: "19021520486",
    appId: "1:19021520486:web:41f29cdc908c5c1230d7a7",
    measurementId: "G-L5W39HRCEC",
}

if (!firebase.apps.length) firebase.initializeApp(firebaseConfig)
firebase.analytics()
