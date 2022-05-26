const mongoDb = require("../../config/connectdb");
const post = require("../../models/postModel");
var ObjectId = require("mongodb").ObjectID;
const { body, validationResult } = require("express-validator");
//read
const index = async (req, res) => {
  const db = mongoDb.getDb();
  const postCollection = db.collection("post");
  const listPost = await post.listPost(postCollection);
  //Xóa nhiều item.
  if (req.body.delBatch) {
    req.body.item.forEach(async (element) => {
      await post.deleteMany({
        _id: {
          $in: [ObjectId(element)],
        },
      });
    });
    req.flash("message", "Delete sucessfully");
    res.redirect("/post");
    return;
  }
  res.render("layout.ejs", {
    title: "post",
    layout: "post/index",
    listPost: listPost,
    message: req.flash("message"),
  });
};

//create
const createPost = async (req, res) => {
  const db = mongoDb.getDb();
  const category = db.collection("category");
  const listCategory = await category.find().toArray();
  const errors = validationResult(req);
  const actionForm = "createPost";
  if (!errors.isEmpty()) {
    const { name, description, status } = req.body;
    const varForm = {
      name: name,
      description: description,
      status: status,
      listCategory: listCategory,
    };
    res.render("layout.ejs", {
      title: "Create new post",
      layout: "post/formPost",
      error: errors.array(),
      varForm: varForm,
      actionForm: actionForm,
      listCategory: listCategory,
    });
    return;
  } else {
    if (req.body.submit) {
      const db = mongoDb.getDb();
      const post = db.collection("post");
      await post.insertOne({
        title: req.body.title,
        short_description: req.body.short_description,
        description: req.body.description,
        status: req.body.status ? true : false,
        category_id: req.body.category_id,
      });
      // post.create(req.body);
      req.flash("message", "Create sucessfully");
      res.redirect("/post");
    } else {
      res.render("layout.ejs", {
        title: "Create new Post",
        layout: "post/formPost",
        error: false,
        varForm: {},
        actionForm: actionForm,
        listCategory: listCategory,
      });
    }
  }
};

//update
const editPost = async (req, res) => {
  const actionForm = "editPost";
  const db = mongoDb.getDb();
  const post = db.collection("post");
  const category = db.collection("category");
  const listCategory = await category.find().toArray();
  if (req.body.submit) {
    await post.updateOne(
      { _id: ObjectId(req.body.id) },
      {
        $set: {
          title: req.body.title,
          short_description: req.body.short_description,
          description: req.body.description,
          status: req.body.status ? true : false,
          category_id: req.body.category_id,
        },
      }
    );
    req.flash("message", "Edit successfully");
    res.redirect("/post");
  } else {
    const query = { _id: ObjectId(req.params.id) };
    const itemPost = await post.findOne(query, {});
    itemPost.id = req.params.id;
    res.render("layout.ejs", {
      title: "Edit post",
      layout: "post/formPost",
      error: false,
      varForm: itemPost,
      actionForm: actionForm,
      listCategory: listCategory,
    });
  }
};

const delPost = (req, res) => {
  if (req.params.id) {
    const db = mongoDb.getDb();
    const postCollection = db.collection("post");
    post.deletePost(postCollection, req.params.id);
    req.flash("message", "Delete sucessfully");
    res.redirect("/post");
  } else {
    res.status(404).send("Sorry can't find that!");
    // res.render("/post");
  }
};

const validate = (method) => {
  switch (method) {
    case "createPost": {
      return [
        body("title", "Empty title")
          .trim()
          .isLength({ min: 1 })
          .escape()
          .withMessage("must be at least 5 chars long"),
        body("description", "Empty description")
          .trim()
          .isLength({ min: 1 })
          .escape()
          .withMessage("descrition khong duoc rong"),
        // body("phone").optional().isInt(),
        // body("status").optional().isIn(["enabled", "disabled"]),
      ];
    }
    default: {
      return [
        body("name", "Empty title")
          .trim()
          .isLength({ min: 1 })
          .escape()
          .withMessage("must be at least 5 chars long"),
        body("description", "Empty description")
          .trim()
          .isLength({ min: 1 })
          .escape()
          .withMessage("descrition khong duoc rong"),
        // body("phone").optional().isInt(),
        // body("status").optional().isIn(["enabled", "disabled"]),
      ];
    }
  }
};

module.exports = {
  index,
  createPost,
  editPost,
  delPost,
  validate,
};
