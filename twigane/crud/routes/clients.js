const mongoose = require('mongoose');

const clientschema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
   // image: {
   //     type: String,
   //     required: true
   // },
    created: {
        type: Date,
        required: true,
        default: Date.now
    }
});

const collection = mongoose.model('clients', clientschema);

module.exports = { collection };
