require("dotenv").config();

const admin = require("firebase-admin");

const serviceAccount = JSON.parse(process.env.FIREBASE_CONFIG);
serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, '\n');


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://quiz-dsa-leaderboard-default-rtdb.firebaseio.com" // replace with your Firebase Realtime DB URL
});
const db = admin.database();
module.exports = db;

