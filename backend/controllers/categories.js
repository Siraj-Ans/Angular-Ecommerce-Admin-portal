const Category = require("../../backend/models/category");

exports.createCategory = (req, res) => {
  let category = null;

  if (req.body.parent) {
    category = new Category({
      categoryName: req.body.categoryName,
      parent: req.body.parent,
      properties: req.body.properties,
    });
  } else {
    category = new Category({
      categoryName: req.body.categoryName,
      properties: req.body.properties,
    });
  }

  category
    .save()
    .then((document) => {
      return Category.findOne({ _id: document._id }).populate("parent");
    })
    .then((document) => {
      res.status(201).json({
        message: "successfully added the category!",
        category: document,
      });
    })
    .catch(() => {
      if (!res.headersSent) {
        res.status(404).json({
          message: "Couldn't create the category!",
        });
      }
    });
};

exports.fetchCategories = (req, res) => {
  Category.find()
    .populate("parent")
    .then((documents) => {
      res.status(200).json({
        categories: documents,
      });
    })
    .catch(() => {
      res.status(500).json({
        message: "Server failed to fetch the categories!",
      });
    });
};

exports.fetchParentCategory = (req, res) => {
  ParentCategory.find()
    .then((documents) => {
      res.status(200).json({
        message: "Successfully fetched parent categories!",
        parentCategories: documents,
      });
    })
    .catch(() => {
      res.status(500).json({
        message: "Server failed fetching parent categories!",
      });
    });
};

exports.updateCategory = (req, res) => {
  console.log("haha: ", req.body);
  Category.updateOne(
    { _id: req.body.id },
    {
      _id: req.body.id,
      categortName: req.body.categortName,
      parent: req.body.parent.id,
      properties: req.body.properties,
    }
  )
    .then((result) => {
      console.log(result);
      if (result.modifiedCount) {
        res.status(200).json({
          message: "Successfully edited the category!",
        });

        return;
      } else {
        res.status(401).json({
          message: "Couldn't edit the category!",
        });

        return;
      }
    })
    .catch((err) => {
      console.log(err);
      if (!res.headersSent)
        res.status(500).json({
          message: "Server failed to edit the category!",
        });
    });
};

exports.deleteCategory = (req, res) => {
  const id = req.params.id;

  Category.deleteOne({ _id: id })
    .then((result) => {
      if (result.deletedCount > 0) {
        res.status(200).json({
          message: "successfully deleted the category",
        });

        return;
      } else {
        res.status(404).json({
          message: "couldn't delete the category",
        });

        return;
      }
    })
    .catch(() => {
      if (!res.headersSent)
        res.status(404).json({
          message: "could't delete the category!",
        });
    });
};
