const { Router } = require("express");
const router = Router();

const userRoutes = require("./user.routes");
const loginRoutes = require("./login.routes");
const productRoutes = require("./product.routes");

router.use("/users", userRoutes);
router.use("/login", loginRoutes);
router.use("/product", productRoutes);

module.exports = router;
