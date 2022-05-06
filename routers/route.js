const express = require("express");
const category = require("../controllers/category/categoryController");
const pageAbout = require("../controllers/page/aboutController");
const pageContact = require("../controllers/page/contactController");
const router = express.Router();
router.get("/category", category.index);
router.get("/createCategory", category.createCategory);
router.post(
  "/createCategory",
  category.validate("createCategory"),
  category.createCategory
);
//Static page
router.get("/about", pageAbout.index);
router.get("/contact", pageContact.index);
module.exports = router;