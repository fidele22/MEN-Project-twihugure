const express = require('express');
const router = express.Router();
const { collection } = require('./clients');



//API fetching data from mongoose database to ejs tamplate engine

router.get("/", (req, res) => {
    collection.find().exec()
        .then(clients => {
            res.render("index", {
                title: "home page",
                clients: clients,
            });
        })
        .catch(err => {
            res.json({ message: err.message });
        });
});

module.exports = router;










router.get('/clients',(req,res)=>{
    res.render('form');
});

router.post('/add',async (req,res)=>{
    const user = {
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone,
       

    };
    const userdata = await collection.insertMany(user);  
    console.log(userdata) 
       res.redirect('/')
    });

module.exports =router;
 
