var express = require("express");
var router = express.Router();

/* GET home page. */
//localhost:3000/product
router.get("/", function (req, res) {
  res.render("product");
});

//localhost:3000/product/vistaProduct
router.get("/vistaProduct", (req, res) => {
  res.render("product");
});

module.exports = router;
