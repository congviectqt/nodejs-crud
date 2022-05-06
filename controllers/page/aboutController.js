const express = require("express");
const index = (req, res) => {
  res.render("layout.ejs", { title: "Category", layout: "page/about" });
};
module.exports = {
  index,
};
