const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
var cors = require("cors");
var unless = require("express-unless");
var { expressjwt: jwt } = require("express-jwt");
require("dotenv").config({ path: __dirname + "/.env" });

const port = process.env.PORT || 5000;
var mongoUtil = require("./db/mongo.js");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(express.static("public"));


app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: process.env.SECRET,
    cookie: { maxAge: 1209600000 },
  })
);

app.use(
  jwt({
    secret: process.env.SECRET,
    algorithms: ["HS256"],
  }).unless({
    path: [
      "/api/login",
      "/api/users",
      {url : "/api/product", methods:["GET"]}
    ],
  })
);

app.listen(port, () => {
  console.log(
    `${process.env.APP_NAME} running at http://localhost:${process.env.PORT} in ${process.env.NODE_ENV} mode`
  );
  console.log("Press CTRL-C to stop\n");
});

mongoUtil.connectToServer(function (err, db) {
  if (err) {
    console.error(err);
  } else {
    console.log("Connected to MongoDB Database\n");
  }
});

const routes = require("./routes/routes");
app.use("/api/", routes);
