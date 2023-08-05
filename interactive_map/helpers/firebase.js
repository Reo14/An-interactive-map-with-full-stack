const { initializeApp } = require('firebase/app')
const { getAuth } = require('firebase/auth');
const { firebaseConfig , serviceAccount } = require('../config/firebaseConfig')
const  admin = require("firebase-admin");

const firebaseApp = initializeApp(firebaseConfig);
const authFb = getAuth(firebaseApp)

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports= {

  authFb,
  admin

}