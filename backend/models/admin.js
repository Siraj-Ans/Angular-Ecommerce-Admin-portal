const mongoose = require("mongoose");

const adminSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  dateAndTime: { type: String, required: true },
});

module.exports = mongoose.model("Admin", adminSchema);
