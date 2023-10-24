const Admin = require("../../backend/models/admin");

exports.createAdmin = (req, res) => {
  const admin = new Admin({
    email: req.body.email,
    dateAndTime: req.body.dateAndTime,
  });

  Admin.findOne({ email: admin.email }).then((user) => {
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

exports.getAdmins = (req, res) => {
  Admin.find({})
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
  Admin.deleteOne({ email: req.query.email })
    .then((reponseData) => {
      res.status(200).json({
        message: "Successfully deleted the admin!",
      });
    })
    .catch(() => {
      res.status(404);
    });
};
