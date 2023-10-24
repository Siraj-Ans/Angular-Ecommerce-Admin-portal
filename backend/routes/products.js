const express = require("express");
const router = express.Router();
const productsControllers = require("../controllers/products");
const fileMiddleware = require("../middleware/file");

router.post(
  "/create-product",
  fileMiddleware,
  productsControllers.createProduct
);

router.get("/fetch-products", productsControllers.fetchProducts);

router.get("/fetch-product", productsControllers.fetchProduct);

router.put(
  "/update-product",
  fileMiddleware,
  productsControllers.updateProduct
);

router.delete("/delete-product/:id", productsControllers.deleteProduct);

module.exports = router;
