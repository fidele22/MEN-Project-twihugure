// imports
const express = require("express");
const mongoose= require("mongoose");
const session = require("express-session");

const connect = mongoose.connect("mongodb://localhost:27017/node_crud");// database connection 

//check database connected or not

connect.then(()=>{
    console.log("database connected successful")
})
.catch(()=>{
    console.log("database connection fail")
})


const app =express();
const port= process.env.port || 3000;
//set template engine

app.set('view engine','ejs');

//middlewares

app.use(express.urlencoded({extended:false}))
app.use(express.json());
app.use(session({
    secret:'this secret key',
    saveUninitialized:true,
    resave:false,

}))

app.use((req,res,next) =>{
  res.locals.message =req.session.message;
  delete req.session.message;
  next();
})


//routes prefix
app.use("",require("./routes/routes"));

app.listen(port, ()=>{

    console.log(`server start at http://localhost:${port} `)


})