const mongoose = require("mongoose");
const connect = mongoose.connect("mongodb://localhost:27017/twigane");

//check database connected or not

connect.then(()=>{
    console.log("database connected successful")
})
.catch(()=>{
    console.log("database connection fail")
})

//creation of database schema/database atribute/column which filled with data inserted.

const loginschema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    telephone:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    }
});
// create collection model

const collection= new mongoose.model("clients",loginschema);

module.exports = collection;