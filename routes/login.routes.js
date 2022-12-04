const { Router, application } = require("express");
const router = Router();

const loginController = require("../controller/login.controller");

router.post("/", loginController.login);

module.exports = router;
