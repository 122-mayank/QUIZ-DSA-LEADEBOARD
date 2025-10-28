const express = require('express');
const path = require('path');
const db = require('./firebase');
const app = express();
require("dotenv").config();

console.log(__dirname);
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'../','views'));


app.use(express.urlencoded({extended:true}));
app.use(express.json());


app.use(express.static(path.join(__dirname,'../')));



app.get('/',(req,res)=>{
      res.render('index');
});

app.get('/login',(req,res)=>{
     res.render('login');
});

app.get('/signup',(req,res)=>{
     res.render('signup');
});

app.get('/category',(req,res)=>{
     res.render('category');
});

app.get('/profile',(req,res)=>{
     res.render('profile');
});

app.post('/submit-sign-up', async (req, res) => {
  const { FullName, Email, Password } = req.body;

  if (!FullName || !Email || !Password) {
    return res.json({ success: false, message: "Please fill all the fields correctly" });
  }

  try {
    const emailKey = Email.replace('.', ',');
    const userRef = db.ref("users").child(emailKey);

    const snapshot = await userRef.once("value");

    if (snapshot.exists()) {
      console.log("⚠️ User already exists:", Email);
      return res.json({ success: false, message: "User already exists! Please login instead." });
    }

    await userRef.set({
      name: FullName,
      email: Email,
      password: Password
    });

    console.log("User added:", FullName);
    return res.json({ success: true, message: "Signup successful! Redirecting to login..." });

  } catch (error) {
    console.error("Firebase error:", error);
    res.json({ success: false, message: "Error saving data. Try again." });
  }
});

const PORT = 3001;
app.listen(PORT , ()=>{
     console.log(`Server is running on http://localhost:${PORT}`);
});