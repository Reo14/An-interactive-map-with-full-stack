const firebaseConfig = {

  apiKey: process.env.API_KEY_FIREBASE,
  authDomain: "proyecto-final-backend-f0580.firebaseapp.com",
  projectId: "proyecto-final-backend-f0580",
  storageBucket: "proyecto-final-backend-f0580.appspot.com",
  messagingSenderId: "665182018458",
  appId: process.env.APPID

};


const serviceAccount = {

  "type": "service_account",
  "project_id": process.env.PROJECT_ID,
  "private_key_id": process.env.FIREBASE_PRIVATE_KEY_ID,
  "private_key": process.env.FIREBASE_PRIVATE_KEY,
  "client_email": process.env.CLIENT_EMAIL,
  "client_id": process.env.CLIENT_ID,
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-rxrxg%40proyecto-final-backend-f0580.iam.gserviceaccount.com"

}

module.exports={

  firebaseConfig,
  serviceAccount
  
}