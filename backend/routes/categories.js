const express = require("express");
const router = express.Router();
const categoryControllers = require("../controllers/categories");
const authMiddleware = require("../../backend/middleware/check-auth");

router.post("/create-category", categoryControllers.createCategory);

router.get(
  "/fetch-categories",
  authMiddleware,
  categoryControllers.fetchCategories
);

router.put("/update-category", categoryControllers.updateCategory);

router.delete("/delete-category/:id", categoryControllers.deleteCategory);

router.get("/fetch-parent-categories", categoryControllers.fetchParentCategory);

module.exports = router;
