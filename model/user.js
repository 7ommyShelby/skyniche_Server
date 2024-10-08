const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({

    firstName: {
        type: String,
        // required: true
    },
    lastName: {
        type: String,
        // required: true
    },
    email: {
        type: String,
        // required: true,
        unique: true,
        // lowercase: true
    },
    department: {
        type: String,
        // required: true
    },
    designation: {
        type: String,
        // required: true
    },
    doj: {
        type: Date,
        // required: true
    },
    salary: {
        type: Number,
        // required: true
    },
    profile: {
        type: String,
        // required: true
    }
})

const usermodel = mongoose.model('User', userSchema);
module.exports = usermodel;