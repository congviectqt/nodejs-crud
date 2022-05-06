const express = require("express");
const path = require("path");
const app = express();
app.set("view engine", "ejs");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", require("./routers/route"));
const mongoDb = require("./config/connectdb");

//Routes

mongoDb.connectToServer(function (err) {
  app.get("/", (req, res) => {
    const db = mongoDb.getDb();
    res.render("layout.ejs", { layout: "", title: "Home" });
  });

  app.listen(5000, function () {
    console.log("Node server is running...");
  });
});
