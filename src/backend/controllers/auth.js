const User = require("../models/users");

exports.login = (req, res) => {
  const email = req.query.email;
  console.log("params: ", req.query.email);

  User.findOne({ email: email })
    .then((user) => {
      if (user)
        res.status(200).json({
          email: user.email,
        });
      else
        res.status(404).json({
          message: "User not found!",
        });
    })
    .catch(() => {
      res.status(400).json({
        message: "Server side error!",
      });
    });
};

exports.createAdmin = (req, res) => {
  const admin = new User({
    email: req.body.email,
  });

  User.findOne({ email: admin.email }).then((user) => {
    if (user) {
      res.status(409).json({
        message: "Admin already exists",
        status: "error",
      });

      return;
    }

    admin
      .save()
      .then(() => {
        res.status(201).json({
          message: "Successfully added the user!",
          status: "success",
        });
      })
      .catch(() => {
        res.status(404).json({
          message: "Error added the user!",
          status: "error",
        });
      });
  });
};
