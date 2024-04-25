const express = require('express');
const bcrypt = require ('bcrypt');
const path = require('path');
const { render, name } = require('ejs');
const collection = require("./config");


const app= express();

//use ejs as view engine 
app.set('view engine', 'ejs');

// static file help to use css and script
app.use(express.static('public'));

// converting data inserted into database to json format
app.use(express.json());

app.use(express.urlencoded({extended:false}));

//function used to get template in views folder and rendering it on browser
app.get("/",(req,res)=>{
    res.render("homepage");
});

app.get("/services",(req,res)=>{
    const names = req.body.username;
    res.render("userhome"); 
});
app.get("/contact",(req,res)=>{
    const names = req.body.username;
    res.render("contact"); 
});
app.get("/quizes",(req,res)=>{ // displaying page containg list of quizes
    res.render("quizes");
});
 // displayin every quiz according to quiz number clicked 
app.get("/quiz1",(req,res)=>{ 
    res.render( "quizes/quiz-1");
});

// register form with function helps to send data into database

app.post("/signup", async (req, res) =>{

    const data ={
        name:req.body.username,
        telephone:req.body.telephone,
        password:req.body.password
    }

    // checking if user already exist in database
    const existinguser = await collection.findOne({name: data.name});
    if(existinguser){
        res.send("user already exist");
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
        return res.send("kwiyandikisha byagenze neza!");
        
    }
   
});

//login function with data sent into database

app.post("/login",async (req,res)=>{  //this /login is a name found on form in htm file as form action and 
                                        //method post use here

    try{
        const checkdatails= await collection.findOne({name: req.body.username});
        if(!checkdatails){
            res.send("user not found")


        }
        
        //comparing password entered and hashpassword those ones converted/ 
        //checking when you are loggin in

        const passwordentered= await bcrypt.compare(req.body.password, checkdatails.password);
        if(passwordentered){
            const name = req.body.username;
            res.render("userhome", { name });   //direct your name on homepage you want to enter when you logging in
             
        }else{
            res.send("wrong password")
        }
    }
    catch{
        res.send("wrong datails")

    }
})
// displying template or pages on user dashboard


// localhost port used to look output on browser
const port= 5000;
app.listen(port, ()=>{
    console.log(`surver running on port:${port}`);
})