const express = require("express");
const category = require("../controllers/category/categoryController");
const pageAbout = require("../controllers/page/aboutController");
const pageContact = require("../controllers/page/contactController");
const post = require("../controllers/post/postController");
const media = require("../mediaController");
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

//Post
router.get("/post", post.index);
// router.post("/post", post.index);

router.get("/createPost", post.createPost);
router.post("/createPost", post.validate("createPost"), post.createPost);
router.get("/editPost/:id", post.editPost);
router.post("/editPost", post.validate("createPost"), post.editPost);
router.get("/delPost/:id", post.delPost);

//Static page
router.get("/about", pageAbout.index);
router.get("/contact", pageContact.index);
router.get("/folder", media.showList);
module.exports = router;
