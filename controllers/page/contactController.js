const express = require("express");
const index = (req, res) => {
  res.render("layout.ejs", { title: "Contact", layout: "page/contact" });
};
module.exports = {
  index,
};
