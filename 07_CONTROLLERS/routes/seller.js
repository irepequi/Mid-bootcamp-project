var express = require("express");
const sellerController = require("../controllers/sellerController");
const uploadImage = require("../middleware/uploadFile");
var router = express.Router();

// Ruta base = localhost:3000/seller

/* GET home page. */
router.get("/", sellerController.viewHome);

// localhost:3000/seller/register
router.get("/register", sellerController.renderCreateForm);

// localhost:3000/seller
router.post("/", uploadImage(), sellerController.createSeller);

// localhost:3000/deleteSeller/:id
router.get("/deleteSeller/:id", sellerController.deleteSeller);

// localhost:3000/seller/oneSeller/:id
router.get("/oneSeller/:id", sellerController.viewOneSeller);

// localhost:3000/product/productEditForm/:product_id
router.get("/sellerEditForm/:seller_id", sellerController.viewSellerEditForm);

// localhost:3000/product/editSeller/:product_id/:seller_id
router.post(
  "/editSeller/:seller_id",
  uploadImage(),
  sellerController.editSeller
);

module.exports = router;
