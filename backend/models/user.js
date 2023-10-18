const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  dateAndTime: { type: String, required: true },
});

module.exports = mongoose.model("User", userSchema);
