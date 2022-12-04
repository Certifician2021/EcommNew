const { Router } = require("express");
const router = Router();

const userController = require("../controller/user.controller");

router.post("/", userController.signUp);

module.exports = router;
