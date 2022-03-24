var express = require("express");
var router = express.Router();

/* GET home page. */
//localhost:3000/
router.get("/", function (req, res) {
  res.render("Mi primer método del index.js");
});

//localhost:3000/vistaIndex
router.get("/vistaIndex", (req, res) => {
  res.render("index");
});

module.exports = router;
