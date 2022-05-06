const mongoDb = require("../../config/connectdb");
const { body, validationResult } = require("express-validator");

const index = async (req, res) => {
  const db = mongoDb.getDb();
  const category = db.collection("category");
  const listCat = await category.find().toArray();
  res.render("layout.ejs", {
    title: "Category",
    layout: "category/index",
    listCat: listCat,
  });
};

const createCategory = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const { name, description, status } = req.body;
    const varForm = {
      name: name,
      description: description,
      status: status,
    };
    res.render("layout.ejs", {
      title: "Create new categroy",
      layout: "category/createCategory",
      error: errors.array(),
      varForm: varForm,
    });
    return;
  } else {
    const db = mongoDb.getDb();
    const category = db.collection("category");

    category
      .insertOne(req.body)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => console.error(error));
    res.render("layout.ejs", {
      title: "Create new categroy",
      layout: "category/createCategory",
      error: false,
      varForm: {},
    });
  }
};

// const editCategory = (req, res) => {
//   res.render("layout.ejs", {
//     title: "Create new categroy",
//     layout: "category/createCategory",
//     error: false,
//     varForm: {},
//   });
// };

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
  validate,
};
