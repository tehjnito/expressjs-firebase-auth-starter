if((process.env.NODE_ENV || 'dev') == 'dev') {
    require("dotenv").config();
}

const fireAdmin = require('firebase-admin');

let serviceAccount = require('../../serviceAccountKey.json'); 

fireAdmin.initializeApp({
    credential: fireAdmin.credential.cert(serviceAccount),
    databaseURL: process.env.FIRE_DB_URL
});

const firestore = fireAdmin.firestore();
const fireMessaging = fireAdmin.messaging();

module.exports = { fireAdmin, firestore, fireMessaging }