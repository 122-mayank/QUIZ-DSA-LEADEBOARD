const admin = require("firebase-admin");
const serviceAccount = require("./firebase-service.json"); // make sure this file exists

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://quiz-dsa-leaderboard-default-rtdb.firebaseio.com" // replace with your Firebase Realtime DB URL
});

const db = admin.database();
module.exports = db;
