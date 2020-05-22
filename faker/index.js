var faker = require('faker')

var admin = require("firebase-admin")
var serviceAccount = require("./serviceAccount.json")
const { GeoFirestore } = require("geofirestore")

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://thaifoodbank.firebaseio.com"
})

const db = admin.firestore()
const geofirestore = new GeoFirestore(db)
const geocollection = geofirestore.collection("posts")

async function generate(){
    for (var i = 0; i < 40; i++) {
        const userGeo = new admin.firestore.GeoPoint(Number(0), Number(0))
        await geocollection.add({
            uid: 'faker',
            name: faker.name.findName(),
            pid: '0000000000001',
            need: faker.lorem.sentences(),
            createdAt: faker.date.past(),
            description: faker.lorem.sentences(),
            contact: faker.phone.phoneNumber(),
            coordinates: userGeo,
            placename: 'Null Island',
            active: true,
            donors: 0,
            photos: ['1.jpg'],
        })
        console.log(i)
    }
}

(async () => {
    try {
        await generate()
    } catch (e) {
        console.log(e)
    }
})();