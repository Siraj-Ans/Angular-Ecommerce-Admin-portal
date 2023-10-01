const User = require("../models/user");

exports.getAdmins = (req, res) => {
  User.find({})
    .then((documents) => {
      res.status(200).json({
        admins: documents,
      });
    })
    .catch(() => {
      res.status(404).json({
        message: "error fetching admins!",
      });
    });
};

exports.deleteAdmin = (req, res) => {
  console.log("trig!");
  User.deleteOne({ email: req.query.email })
    .then((reponseData) => {
      res.status(200).json({
        message: "Successfully deleted the admin!",
      });
    })
    .catch(() => {
      res.status(404);
    });
};
