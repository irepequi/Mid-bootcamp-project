const express = require("express");
const path = require("path");
const router = express.Router();
module.exports = router;

//Ruta base : localhost:3000

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/../HTML/pretty.html"));
});
