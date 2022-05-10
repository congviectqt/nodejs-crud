const mongoDb = require("../../config/connectdb");
var ObjectId = require("mongodb").ObjectID;
const { body, validationResult } = require("express-validator");

//read
const index = async (req, res) => {
  // Print new id to the console
  const db = mongoDb.getDb();
  const category = db.collection("category");
  const listCat = await category.find().toArray();
  //Xóa nhiều item.
  if (req.body.delBatch) {
    console.log(req.body.item);
    req.body.item.forEach(async (element) => {
      await category.deleteMany({
        _id: {
          $in: [ObjectId(element)],
        },
      });
    });
    req.flash("message", "Delete sucessfully");
    res.redirect("/category");
    return;
  }
  res.render("layout.ejs", {
    title: "Category",
    layout: "category/index",
    listCat: listCat,
    message: req.flash("message"),
  });
};

//create
const createCategory = async (req, res) => {
  const errors = validationResult(req);
  const actionForm = "createCategory";
  if (!errors.isEmpty()) {
    const { name, description, status } = req.body;
    const varForm = {
      name: name,
      description: description,
      status: status,
      actionForm: actionForm,
    };
    res.render("layout.ejs", {
      title: "Create new categroy",
      layout: "category/createCategory",
      error: errors.array(),
      varForm: varForm,
    });
    return;
  } else {
    if (req.body.submit) {
      const db = mongoDb.getDb();
      const category = db.collection("category");
      await category.insertOne(req.body);
      req.flash("message", "Create sucessfully");
      res.redirect("/category");
    } else {
      res.render("layout.ejs", {
        title: "Create new categroy",
        layout: "category/createCategory",
        error: false,
        varForm: {},
        actionForm: actionForm,
      });
    }
  }
};

//update
const editCategory = async (req, res) => {
  const actionForm = "editCategory";
  const db = mongoDb.getDb();
  const category = db.collection("category");
  if (req.body.submit) {
    console.log(`UPDATE`);
    await category.updateOne(
      { _id: ObjectId(req.body.id) },
      {
        $set: {
          name: req.body.name,
          description: req.body.description,
          status: req.body.status,
        },
      }
    );
    req.flash("message", "Edit successfully");
    res.redirect("/category");
  } else {
    const query = { _id: ObjectId(req.params.id) };
    const itemCat = await category.findOne(query, {});
    itemCat.id = req.params.id;
    res.render("layout.ejs", {
      title: "Create new categroy",
      layout: "category/createCategory",
      error: false,
      varForm: itemCat,
      actionForm: actionForm,
    });
  }
};

const delCategory = (req, res) => {
  if (req.params.id) {
    const db = mongoDb.getDb();
    const category = db.collection("category");
    category.deleteOne({ _id: ObjectId(req.params.id) });
    req.flash("message", "Delete sucessfully");
    res.redirect("/category");
  }
};

const validate = (method) => {
  switch (method) {
    case "createCategory": {
      return [
        body("name", "Empty name")
          .trim()
          .isLength({ min: 1 })
          .escape()
          .withMessage("must be at least 5 chars long"),
        body("description", "Empty name")
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
  createCategory,
  editCategory,
  delCategory,
  validate,
};
