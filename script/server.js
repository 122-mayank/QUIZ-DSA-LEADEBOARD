const express = require('express');
const path = require('path');
const app = express();

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
})



const PORT = 3001;
app.listen(PORT , ()=>{
     console.log(`Server is running on http://localhost:${PORT}`);
});