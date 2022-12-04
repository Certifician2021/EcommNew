var mongoUtil = require("../db/mongo");
var bcrypt = require("bcryptjs");

exports.login = async (req, res) => {
  console.log("################ In Login Route #################");
  let db = mongoUtil.getDb();
  let { username, password } = req.body;
  var jwt = require("jsonwebtoken");

  let user = await db.collection("users").findOne({ username: username });

  if (!user) {
    console.log("user not available");
    res.status(404).send({ success: false, message: "No user found." });
  } else {
    if (user) {
      console.log("Admin Login ...");
      if (
        user &&
        user.password &&
        bcrypt.compareSync(password, user.password)
      ) {
        let accessToken = jwt.sign(
          {
            exp:
              Math.floor(Date.now() / 1000) +
              parseInt(process.env.ACCESS_TOKEN_EXPIRATION),
            userID: user.userID,
          },
          process.env.SECRET
        );

        await db
          .collection("user")
          .updateOne(
            { username: username, userID: user.userID, role: "Admin" },
            { $set: { accessToken: accessToken } }
          );


        res.status(200).send({
          success: true,
          message: `Successfully ${user.role} Login.`,
          accessToken: accessToken,
          role: user.role,
          userInfo:{
            userID:user.userID,
            fullName:user.fullName
          }
        });
      } else {
        console.log("Password is incorrect.");
        res.status(200).send({
          success: false,
          message: "Password is incorrect. Please try again.",
        });
      }
    }
    // else if (user && user.role === "Customer") {
    //   console.log("Customer Login ...");
    // }
  }
};
