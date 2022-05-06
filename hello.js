var http = require("http");
const express = require("express");
const app = express();
app.set("view engine", "ejs");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
const MongoClient = require("mongodb").MongoClient;

const connectionString = "mongodb://localhost:27017";
//use callback
// MongoClient.connect(connectString, (err, client) => {
//   if (err) {
//     return console.log(err);
//   }
//   const db = client.db("test");
//   console.log(db);
// });

//use promise
MongoClient.connect(connectionString, { useUnifiedTopology: true })
  .then((client) => {
    console.log("Connected to Database");
    const db = client.db("Test");
    const quotesCollection = db.collection("category");
    app.get("/", (req, res) => {
      res.render("index.ejs", {});
    });

    app.post("/quotes", (req, res) => {
      console.log(`xxxxxxxxxxxx`, req.body);
      quotesCollection
        .insertOne(req.body)
        .then((result) => {
          console.log(result);
        })
        .catch((error) => console.error(error));
    });

    var server = app.listen(5000, function () {
      console.log("Node server is running..");
    });
  })
  .catch((error) => console.error(error));
