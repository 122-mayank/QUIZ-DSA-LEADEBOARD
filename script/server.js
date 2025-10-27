const express = require('express');
const path = require('path');
const db = require('./firebase');
const app = express();
require("dotenv").config();

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'../','views'));


app.use(express.urlencoded({extended:true}));
app.use(express.json());


app.use(express.static(path.join(__dirname,'../','Public')));



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

app.post('/submit-sign-up', async(req,res)=>{

    const{FullName , Email , Password} = req.body;

    if(!FullName || !Email || !Password){
         return res.send("Please fill all the fields correctly");
    }


    try{
        await db.ref("users").child(Email.replace('.',',')).set({

            name :FullName,
            email:Email,
            password:Password
        });

        console.log("Users added to Realtime Database DB: ", FullName);
        res.redirect('/login');

    }catch(error){
        console.error("Firebase error:", error);
        res.send("Error saving data. Try again.");
    }


});



const PORT = 3001;
app.listen(PORT , ()=>{
     console.log(`Server is running on http://localhost:${PORT}`);
});