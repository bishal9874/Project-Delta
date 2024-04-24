const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/QuizAppUsers", {
}).then(() => {
    console.log(`DB connection Success`);
}).catch((e) => {
    console.log(e);
});

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    dob: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});

const UserCollection = mongoose.model("UserCollection", userSchema);

const adminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    }
});

const adminCollection = mongoose.model("adminCollection", adminSchema);

module.exports = { UserCollection, adminCollection }; // Export both collections together
