const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // Use bcryptjs instead of bcrypt

const Schema = mongoose.Schema;

const UserModel = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    age: {
        type: Number,
        required: true,
        unique: true,
    },
    password: { // Corrected typo "pasword" to "password"
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    status: {
        type: Number,
        required: true,
    },
    message: {
        type: String,
    }
});

// Hash password before saving user to the database
UserModel.pre("save", async function (next) {
    const user = this;

    // Check if the password field is modified
    if (!user.isModified("password")) {
        return next();
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
    next();
});

const UserSchema = mongoose.model('users', UserModel);
module.exports = UserSchema;



// const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');

// const Schema = mongoose.Schema;

// const UserModel = new Schema({
//     name: {
//         type: String,
//         required: true
//     },
//     email: {
//         type: String,   
//         required: true,
//         unique: true,
//     },
//     age: {
//         type: Number,
//         required: true,
//         unique: true,
//     },
//     pasword: {
//         type: String,
//         required: true,

//     },
//     date: {
//         type: Date,
//         required: true,
//     },
//     status: {
//         type: Number,
//         required: true,

//     },
//     message: {
//         type: String,


//     }

// });

// UserModel.pre("save", async function name(next) {

//     const user = this;
//     const salt = await bcrypt.genSalt(10);
//     const hash = await bcrypt.hash(user.password, salt);
//     this.password = hash;
//     next();


// });
// const UserSchema = mongoose.model('users', UserModel);
// module.exports = UserSchema;
