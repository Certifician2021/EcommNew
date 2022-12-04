const { Router } = require("express");
const router = Router();

const productController = require("../controller/product.controller");

router.post("/", productController.addProduct);
router.get("/", productController.getAllProducts);
router.post("/checkout", productController.checkout)
router.post('/orderCompleted', productController.orderCompleted)

module.exports = router;
