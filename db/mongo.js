const MongoClient = require("mongodb").MongoClient;
require("dotenv").config({ path: __dirname + "/../../.env" });
var _db;
var database = process.env.MONGO_DATABASE_NAME;
var mongoUrl = process.env.MONGODB_URI;

module.exports = {
  connectToServer: function (callback) {
    MongoClient.connect(
      mongoUrl,
      { useNewUrlParser: true, useUnifiedTopology: true },
      function (err, client) {
        _db = client.db(database.toString());

        return callback(err, _db);
      }
    );
  },

  getDb: function () {
    return _db;
  },
};
