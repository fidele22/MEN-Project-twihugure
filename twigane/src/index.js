const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');
const bcrypt = require ('bcrypt');
const path = require('path');
const { render, name } = require('ejs');
const collection = require("./config");


const app= express();

// used to display flash message on validating form

app.use(express.urlencoded({ extended:false }));
app.use(session({
  secret: 'scret key',
  resave: false,
  saveUninitialized: false
}));
app.use(flash());

//use ejs as view engine 
app.set('view engine', 'ejs');

// static file help to use css and script
app.use(express.static('public'));

// converting data inserted into database to json format
app.use(express.json());

app.use(express.urlencoded({extended:false}));

//function used to get template in views folder and rendering it on browser
app.get('/', (req, res) => {
    res.render('homepage', { messages: req.flash() });
});


app.get("/services",(req,res)=>{
    res.render("userhome"); 
});
app.get("/contact",(req,res)=>{
    const name = req.body.username;
    res.render("contact",{name}); 
});
app.get("/quizes",(req,res)=>{ // displaying page containg list of quizes
    res.render("quizes");
});
 // displaying every quiz according to quiz number clicked 
app.get("/quiz1",(req,res)=>{ 
    res.render( "quizes/quiz-1");
});


// Route to fetch and display users on an EJS template
//app.get("/adim", (req, res) => {
//    collection.find().exec()
//        .then(clients => {
//            res.render("adim", {
//                title: "adim dashboard",
//                clients: clients,
//            });
//        })
//        .catch(err => {
//            res.json({ message: err.message });
//        });
//});

app.get("/adim",(req,res)=>{
    res.render("adim")
})

// register form with function helps to send data into database

app.post("/signup", async (req, res) =>{

    const data ={
        name:req.body.username,
        telephone:req.body.telephone,
        password:req.body.password,
      
    }
    
    // checking if user already exist in database
    const existinguser = await collection.findOne({name: data.name});
    if(existinguser){
        req.flash('error', 'user already exist');
        return  res.redirect('/')
    } 
    else{
            //password hashing / to encrypt password created to be in other character in database
            // not visible as created by user from GUI
        const saltRounds=10;
        const hashedpassword = await bcrypt.hash(data.password, saltRounds);
        data.password= hashedpassword;// replace orginal password into hashed password

        //send data into database
        const userdata = await collection.insertMany(data);  
        console.log(userdata) 
        req.flash('success', 'create account successful');
        return res.redirect('/')
        
    }
});

//login function with data sent into database

app.post("/login", async (req, res) => {
    try {                                //this /login is a name found on form in htm file as form action and 
                                        //method post use here

        const checkDetails = await collection.findOne({ name: req.body.username });
        if (!checkDetails) {
            req.flash('error', 'User not found');
            return res.redirect('/')
           


        }       
        //comparing password entered and hashpassword those ones converted/ 
        //checking when you are loggin in

        const passwordEntered = await bcrypt.compare(req.body.password, checkDetails.password);
        if (passwordEntered) {

            if(checkDetails.role === 'admin'){

                 // If the user is an admin, render the admin dashboard
                // start with fetching data //  to fetch from mongodb and display users on an EJS template
                 collection.find({role:'client'}).exec()
                 .then(clients => {
                     res.render("adim", {
                         title: "adim dashboard",
                         clients: clients,
                     });
                 })
                 .catch(err => {
                     res.json({ message: err.message });
                 });
            }
         else {
            // If the user is a client, render the user homepage
            const name = req.body.username;
            return res.render("userhome", { name});
        }
            
     } 
     else {
            req.flash('error', 'Wrong password');
            return res.redirect('/')
            
        }
    }
   catch (err) {
    console.error(err);
    req.flash('error', 'An error occurred');
     return res.redirect('/')
    
}
})
 app.post('/logout',(req,res)=>{

    res.redirect('/');
 })
//deletin data row records from database and update UI// here on admin dashboard
app.get("/delete/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const result = await collection.findByIdAndDelete(id);
        res.redirect("/adim");
    } catch (err) {
        res.json({ message: err.message });
    }
});



// localhost port used to look output on browser
const port= 5000;
app.listen(port, ()=>{
    console.log(`surver running on port:${port}`);
})