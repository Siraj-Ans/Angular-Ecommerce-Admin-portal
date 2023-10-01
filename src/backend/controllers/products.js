const Category = require("../models/category");
const Product = require("../models/product");

exports.fetchProducts = (req, res) => {
  Product.find()
    .populate("productCategory")
    .then((documents) => {
      res.status(200).json({
        message: "Successfully fetched the products!",
        products: documents,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "Server failed to load products!",
      });
    });
};

exports.fetchProduct = (req, res) => {
  let category = null;
  let product = null;

  Product.findOne({ _id: req.query.id })
    .then((document) => {
      product = document;

      return ParentCategory.findOne({ _id: document.productCategory });
    })
    .then((document) => {
      category = document;

      res.status(200).json({
        message: "successfully fetched the product!",
        result: {
          product: product,
          category: category,
        },
      });
    })
    .catch(() => {
      res.status(500).json({
        message: "Server failed fetching the product",
      });
    });
};

exports.createProduct = (req, res) => {
  const product = new Product({
    productName: req.body.productName,
    productCategory: req.body.productCategory,
    productImages: req.files,
    description: req.body.description,
    priceInUSD: +req.body.priceInUSD,
  });

  product
    .save()
    .then((document) => {
      return Product.findOne({ _id: document._id });
    })
    .then((document) => {
      res.status(200).json({
        message: "successfully created the product!",
        product: document,
      });
    })
    .catch((err) => {
      res.status(404).json({
        message: err,
      });
    });
};

exports.updateProduct = (req, res) => {
  console.log(req.body);
  Product.updateOne(
    { _id: req.body.id },
    {
      _id: req.body.id,
      productName: req.body.productName,
      productCategory: req.body.productCategory,
      productImages: req.files,
      description: req.body.description,
      priceInUSD: req.body.priceInUSD,
    }
  )
    .then((result) => {
      if (result.modifiedCount > 0) {
        res.status(200).json({
          message: "Successfully updated the product!",
        });
      } else {
        res.status(404).json({
          message: "Couldn't updated the product!",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      if (!res.headersSent)
        res.status(500).json({
          message: "Server failed updating the product!",
        });
    });
};

exports.deleteProduct = (req, res) => {
  const productID = req.params.id;

  Product.deleteOne({ _id: productID })
    .then((result) => {
      if (result.deletedCount > 0) {
        res.status(200).json({
          message: "Successfully deleted the product!",
        });

        return;
      } else {
        res.status(404).json({
          message: "Couldn't delete the product!",
        });
      }
    })
    .catch(() => {
      res.status(500).json({
        message: "server failed to delete the product!",
      });
    });
};
