var express = require("express");
const productController = require("../controllers/productController");
const uploadImage = require("../middleware/uploadFile");
var router = express.Router();

// Ruta base = localhost:3000/product

// localhost:3000/product/productForm/:id
router.get("/productForm/:id", productController.viewFormProduct);

// localhost:3000/product
router.post("/:seller_id", uploadImage(), productController.addProduct);

// localhost:3000/product/deleteProduct/:product_id/:seller_id
router.get(
  "/deleteProduct/:product_id/:seller_id",
  productController.deleteProduct
);

// localhost:3000/product/productEditForm/:product_id
router.get(
  "/productEditForm/:product_id",
  productController.viewProductEditForm
);

// localhost:3000/product/editProduct/:product_id/:seller_id
router.post(
  "/editProduct/:product_id/:seller_id",
  uploadImage(),
  productController.editProduct
);

module.exports = router;
