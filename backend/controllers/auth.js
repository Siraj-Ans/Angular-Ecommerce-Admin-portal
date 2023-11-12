const Admin = require("../models/admin");
const User = require("../models/user");

exports.login = (req, res) => {
  console.log('trig') 
  User.findOne({ email: req.query.email, sub: req.query.sub })
  .then((result) => {
    if(!result) {
      return res.status(404).json({
        message: "User not authorized to login!"
      })
    }

    return res.status(200).json({
      message: "User found!"
    })
  })
  .catch(() => {
    if(!res.headersSent) {
      return es.status(500).json({
        message: "Server failed to authenticate the user!"
      })
    }
  })
};

exports.signup = (req, res ) => {
  const user = new User({
    email: req.body.email,
    name: req.body.name,
    picture: req.body.picture,
    sub: req.body.sub
  })

  Admin.findOne({ email: user.email })
  .then((admin) => {
    if(!admin) {
      return res.status(404).json({
        message: "Not authorized to create the user!"
      })
    }

    return user.save();
  })
  .then((document) => {
    if(!res.headersSent)
    return res.status(200).json({
      user: document,
      message: "successfully created the user!"
    })
  })
  .catch(() => {
    return res.status(500).json({
      message: "Server failed to create the user!"
    })
  })
}