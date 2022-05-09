//Mongo Connection credentials
require("dotenv").config();
const CONNECTION_URL = process.env.CONNECTION_URL;
const DATABASE_NAME = process.env.DATABASE_NAME;
const MongoClient = require("mongodb").MongoClient;
let _db;
module.exports = {
  connectToServer: function (callback) {
    MongoClient.connect(CONNECTION_URL, function (err, client) {
      if (err) {
        return console.log(err);
      }
      _db = client.db(DATABASE_NAME);
      console.log("Connected to database: " + DATABASE_NAME);
      return callback(err);
    });
  },
  getDb: function () {
    return _db;
  },
};
