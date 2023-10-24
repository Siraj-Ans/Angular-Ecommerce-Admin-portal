const mongoose = require('mongoose');
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    picture: { type: String, required: true },
    sub: { type: String, required: true, unique: true }
})

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);