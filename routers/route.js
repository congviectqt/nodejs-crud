const express = require("express");
const category = require("../controllers/category/categoryController");
const pageAbout = require("../controllers/page/aboutController");
const pageContact = require("../controllers/page/contactController");
const router = express.Router();
router.get("/category", category.index);
router.post("/category", category.index);
router.get("/createCategory", category.createCategory);
router.post(
  "/createCategory",
  category.validate("createCategory"),
  category.createCategory
);

router.get("/editCategory/:id", category.editCategory);
router.post(
  "/editCategory",
  category.validate("createCategory"),
  category.editCategory
);

router.get("/delCategory/:id", category.delCategory);
//Static page
router.get("/about", pageAbout.index);
router.get("/contact", pageContact.index);
module.exports = router;
