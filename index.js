const express = require("express");
const app = express();
const mongoDb = require("./config/connectdb");
const session = require("express-session");
const flash = require("connect-flash");
const path = require("path");
app.use(flash());
app.use(
  session({
    cookie: { maxAge: 60000 },
    secret: "woot",
    resave: false,
    saveUninitialized: false,
  })
);
app.set("view engine", "ejs");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", require("./routers/route"));
app.use(express.static("public"));
app.use(
  "/tinymce",
  express.static(path.join(__dirname, "node_modules", "tinymce"))
);
mongoDb.connectToServer(function (err) {
  app.get("/", (req, res) => {
    console.log(`session`, req.session);
    res.render("layout.ejs", { layout: "", title: "Home" });
  });

  app.listen(5000, function () {
    console.log("Node server is running...");
  });
});
console.log("Server running at http://localhost:5000/");
