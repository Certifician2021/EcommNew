var mongoUtil = require("../db/mongo");
var bcrypt = require("bcryptjs");

exports.signUp = async (req, res) => {
  console.log("############# In Customer SignUp Route ###############");
  let db = mongoUtil.getDb();
  let { fullName, username, password, mobileNo } = req.body;

  var admin = await db.collection("users").findOne({ role: "Admin" });
  
  var adminExist = await db.collection("users").findOne({username:username, role: "Admin" });

  let exists = await db
    .collection("users")
    .findOne({ username: username, role: "Customer" });

  if (exists || adminExist) {
    console.log("customer already exists ...");
    res.status(403).send({
      success: false,
      message: "Customer already exists. Please try logging in.",
    });
  } else {
    console.log("registering customer");
    var passwordHash = bcrypt.hashSync(password, 10);
    userID = getUserID();
    let dbObj = {
      fullName:fullName,
      username: username,
      mobileNo: mobileNo,
      adminID: admin.userID,
      userID: userID,
      password: passwordHash,
      role: "Customer",
    };

    let dbInsert = await db.collection("users").insertOne(dbObj);

    if (dbInsert.insertedId === 0) {
      console.log("Unable to create user, please try again later...");
      res.status(400).send({
        success: false,
        message: "Unable to create user, please try again later",
      });
    } else {
      console.log("successfully created customer...");
      res.status(200).send({
        success: true,
        message: "Successfully Created Customer Profile.",
      });
    }
  }
};



const getUserID = (req, res) => {
  let now = Date.now().toString(); // '1492341545873'
  now += now + Math.floor(Math.random() * 10);
  var length = now.length;
  return [now.slice(3, 9), now.slice(length - 2, length)].join("");
};
