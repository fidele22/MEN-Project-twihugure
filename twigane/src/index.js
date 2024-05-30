const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');
const bcrypt = require ('bcrypt');
const path = require('path');
const { render, name } = require('ejs');
const collection = require("./config");
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;


const app= express();

// used to display flash message on validating form

app.use(express.urlencoded({ extended:true }));
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set secure: true if using HTTPS
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
app.get("/quizes",(req,res)=>{ // displaying page containg list of quizes
    res.render("quizes");
});


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
    try {
        const checkDetails = await collection.findOne({ name: req.body.username });
        if (!checkDetails) {
            req.flash('error', 'User not found');
            return res.redirect('/');
        }

        const passwordEntered = await bcrypt.compare(req.body.password, checkDetails.password);

        if (passwordEntered) {
            req.session.userId = checkDetails._id; // Set user ID in session
            req.session.user = checkDetails;
            if (checkDetails.role === 'admin') {
                collection.find({ role: 'client' }).exec()
                    .then(clients => {
                        res.render("Admin/adim", {
                            user:checkDetails,
                            title: "admin dashboard",
                            clients: clients,
                            
                        });
                    })
                    .catch(err => {
                        res.json({ message: err.message });
                    });
            } else {
                const name = req.body.username;
                return res.render("userhome", { name });
            }
        } else {
            req.flash('error', 'Wrong password');
            return res.redirect('/');
        }
    } catch (err) {
        console.error(err);
        req.flash('error', 'An error occurred');
        return res.redirect('/');
    }
});


app.get("/services",(req,res)=>{
    const name = req.body.username;
    res.render("userhome",{name}); 
});
app.get("/contact",(req,res)=>{
    const name = req.body.username;
    res.render("contact",{name}); 
});


 // logout 
 app.get('/logout', (req, res) => {
    // Destroy the session
    req.session.destroy((err) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Unable to log out');
        }
        res.render('/'); // Redirect to the homepage or login page
    });
});

 
//delete in data row records from database and update UI// here on admin dashboard
app.get("/delete/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const result = await collection.findByIdAndDelete(id);
        const clients = await collection.find({ role: 'client' });

        if (!req.session.user) {
            req.flash('error', 'User not authenticated');
            return res.redirect('/');
        }

        res.render("Admin/adim", {
            user: req.session.user, // Retrieve the user from the session
            title: "admin dashboard",
            clients: clients,
        });
    } catch (err) {
        res.json({ message: err.message });
    }
});

// Edit in data row records from database and update UI// here on admin dashboard

app.get("/edit/:id", async (req, res) => {
    try {
        let id = req.params.id;
        const user = await collection.findById(id);
        
        if (!user) {
            console.error("No user found with ID:", id);
            return res.redirect("/");
        }

        res.render("Admin/edit-data", { user });
    } catch (err) {
        console.error("Error finding user:", err);
        res.redirect("/");
    }
});

// update in data row records from database and update UI// here on admin dashboard
app.post("/update/:id", async (req, res) => {
    try {
        let id = req.params.id;
        let updatedData = req.body;


        console.log("Updated Data:", updatedData); // Log the data received from the form

        let user = await collection.findByIdAndUpdate(id, updatedData, { new: true });

        if (!user) {
            console.error("No user found with ID:", id);
            return res.redirect("/");
        }

        // Redirect to a success page or the updated user page
        const clients = await collection.find({ role: 'client' });
        res.render("Admin/adim", {
            title: "admin dashboard", 
            clients: clients,
            user: user,  });
    } catch (err) {
        console.error("Error updating user:", err);
        res.redirect("/");
    }
});


// giving a permission to access the content and protecting 
// Middleware to get user from the session and fetch from DB
app.use(async (req, res, next) => {
    try {
        if (!req.session.userId) {
            return res.status(401).send('Unauthorized');
        }

        const user = await collection.findById(req.session.userId);

        if (!user) {
            return res.status(404).send('User not found');
        }

        req.user = user;
        next();
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    }
});
// Middleware to check payment status
const checkPaymentStatus = (req, res, next) => {
    if (req.user && req.user.hasPaid) {
        next(); // User has paid, proceed to the next middleware or route handler
    } else {
        res.render('payment'); // Render a page with the popup message
    }
};

// Route for free  content
app.get('/quiz1',(req, res) => {
    res.render('quizes/quiz-1'); // Render the protected content page
});
// Route for protected content
app.get('/quiz2', checkPaymentStatus, (req, res) => {
    res.render('quizes/quiz-2'); // Render the protected content page
});

// localhost port used to look output on browser
const port= 5000;
app.listen(port, ()=>{
    console.log(`surver running on port:${port}`);
})