const express = require('express');
const path = require('path');
const db = require('./firebase');
// const { messaging } = require('firebase-admin');
const session = require('express-session');
const app = express();

app.use(session({
  secret: "mysecretkey",
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));


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

app.get('/profile', async (req, res) => {

  if (!req.session.user) {
    return res.redirect('/login');
  }

  const emailKey = req.session.user.email.replace('.', ',');
  const userRef = db.ref("users").child(emailKey);

  const snap = await userRef.once("value");
  const userData = snap.val();

  res.render('profile', {
    user: userData
  });

});


app.get('/logout',(req,res)=>{
   req.session.destroy(()=>{
      res.redirect('/login');
   });
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

app.post('/submit_login', async (req, res) => {
  console.log(req.body);

  const { email, password } = req.body;

  try {
    const EmailKey = email.replace('.', ',');
    const userRef = db.ref("users").child(EmailKey);

    const snap = await userRef.once("value");

    if (!snap.exists()) {
      return res.json({ success: false, message: 'No user exists! Please sign up first.' });
    }

    const userData = snap.val();  // get user's data

    // 🔍 Compare entered password with stored password
    if (userData.password === password && userData.email === email ) {

            req.session.user = {
              name: userData.name,
              email: userData.email
            };

            return res.json({ success: true });
         }
    else {
      return res.json({ success: false, message: 'Incorrect password. Please try again.' });
    }

  } catch (error) {
    console.error(error);
    res.json({ success: false, message: 'Error during login process!' });
  }
});


app.get('/array_quiz',(req,res)=>{
         res.render('array_quiz');
});

app.get('/linkedlist_quiz' , (req, res) =>{
    res.render('linkedlist_quiz');
});

app.get('/stack_quiz', (req,res) =>{
  res.render('stack_quiz');
});

app.get('/queue_quiz',(req,res)=>{
     res.render('queue_quiz');
});

app.get('/tree_quiz',(req,res)=>{
   res.render('tree_quiz');
});

app.get('/graph_quiz',(req,res)=>{
  res.render('graph');
})

app.post('/submit-array-quiz', async (req, res) => {
  try {

    if (!req.session.user) {
    return res.json({
      success: true,
      guest: true
    });
  }


    const { score } = req.body;

    const emailKey = req.session.user.email.replace('.', ',');
    const userRef = db.ref("users").child(emailKey);

    const snap = await userRef.once("value");
    const userData = snap.val();

    const prevQuiz = userData.totalQuiz || 0;
    const prevScore = userData.totalScore || 0;
    const prevMarks = userData.totalMarks || 0;

    await userRef.update({
      totalQuiz: prevQuiz + 1,
      totalScore: prevScore + score,
      totalMarks: prevMarks + 15
    });

    res.json({ success: true , guest: false });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false });
  }
});


app.post('/submit-linked-list-quiz', async (req,res)=>{

   try{

       if(!req.session.user){
         return res.json({success:true , guest: true});
       }

       const {score} = req.body;

       const emailKey = req.session.user.email.replace('.' , ',');
       const userRef = db.ref("users").child(emailKey);

       const snap = await userRef.once("value");
       const userData = snap.val();

       const prevQuiz = userData.totalQuiz || 0;
       const prevScore = userData.totalScore || 0;
       const prevMarks = userData.totalMarks || 0;

       await userRef.update({
           totalQuiz: prevQuiz + 1,
           totalScore: prevScore + score,
           totalMarks: prevMarks + 15
       });

       res.json({ success: true , guest: false });

   }
   catch (error) {
    console.error(error);
    res.status(500).json({ success: false });
  }

});

app.post('/submit-stack-quiz' , async(req,res)=>{

   try{

      if(!req.session.user){
          return res.json({success:true , guest:true});
      }

      const {score} = req.body;

      const emailKey = req.session.user.email.replace('.',',');
      const userRef = db.ref("users").child(emailKey);

      const snap = await userRef.once("value");
      const userData = snap.val();

     const prevScore = userData.totalScore || 0;
     const prevQuiz = userData.totalQuiz || 0;
     const prevMarks = userData.totalMarks || 0;

     await userRef.update({

           totalQuiz: prevQuiz + 1,
           totalScore: prevScore + score,
           totalMarks: prevMarks + 15

     });

    res.json({ success: true , guest: false });


   }catch(error){
    console.error(error);
    res.status(500).json({ success: false });
  }
});


app.post('/submit-queue-quiz',async (req,res)=>{

  try{

       if(!req.session.user){
         return res.json({success:true , guest:true});
       }

       const {score} = req.body;

       const emailKey = req.session.user.email.replace('.',',');
       console.log("Email Key: " ,emailKey);

       const userRef =  db.ref("users").child(emailKey);
       console.log(userRef);

       const snap = await userRef.once("value");
       console.log(snap);

       const userData = snap.val();
       console.log(userData);

       const prevScore = userData.totalScore || 0;
       const prevQuiz = userData.totalQuiz || 0;
       const prevMarks = userData.totalMarks || 0;

       await userRef.update({
          
           totalQuiz: prevQuiz + 1,
           totalScore: prevScore + score,
           totalMarks: prevMarks + 15

       });
      
      res.json({ success: true , guest: false });

  }catch(error){
         console.error(error);
         res.status(500).json({ success: false });
  }
});


app.post('/submit-tree-quiz',async(req,res)=>{

try{

       if(!req.session.user){
         return res.json({success:true , guest:true});
       }

       const {score} = req.body;

       const emailKey = req.session.user.email.replace('.',',');
       console.log("Email Key: " ,emailKey);

       const userRef =  db.ref("users").child(emailKey);
       console.log(userRef);

       const snap = await userRef.once("value");
       console.log(snap);

       const userData = snap.val();
       console.log(userData);

       const prevScore = userData.totalScore || 0;
       const prevQuiz = userData.totalQuiz || 0;
       const prevMarks = userData.totalMarks || 0;

       await userRef.update({
          
           totalQuiz: prevQuiz + 1,
           totalScore: prevScore + score,
           totalMarks: prevMarks + 15

       });
      
      res.json({ success: true , guest: false });

  }catch(error){
         console.error(error);
         res.status(500).json({ success: false });
  }
});

app.post('/submit-graph-quiz',async(req,res)=>{

  try{

       if(!req.session.user){
         return res.json({success:true , guest:true});
       }

       const {score} = req.body;

       const emailKey = req.session.user.email.replace('.',',');
       console.log("Email Key: " ,emailKey);

       const userRef =  db.ref("users").child(emailKey);
       console.log(userRef);

       const snap = await userRef.once("value");
       console.log(snap);

       const userData = snap.val();
       console.log(userData);

       const prevScore = userData.totalScore || 0;
       const prevQuiz = userData.totalQuiz || 0;
       const prevMarks = userData.totalMarks || 0;

       await userRef.update({
          
           totalQuiz: prevQuiz + 1,
           totalScore: prevScore + score,
           totalMarks: prevMarks + 15

       });
      
      res.json({ success: true , guest: false });

  }catch(error){
         console.error(error);
         res.status(500).json({ success: false });
  }


});

const PORT = 3001;
app.listen(PORT , ()=>{
     console.log(`Server is running on http://localhost:${PORT}`);
});