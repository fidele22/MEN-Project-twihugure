const mongoose = require("mongoose");
const connect = mongoose.connect("mongodb://localhost:27017/twigane");

// Check if the database is connected or not
connect.then(() => {
    console.log("Database connected successfully")
})
.catch(() => {
    console.log("Database connection failed")
})

// Creation of database schema/database attribute/column which is filled with data inserted.
const loginSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    telephone: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'client'],
        default: 'client'
    },
    created: {
        type: Date,
        required: true,
        default: Date.now
    }
});

// Create collection model
const collection = mongoose.model("clients", loginSchema);

module.exports = collection;
