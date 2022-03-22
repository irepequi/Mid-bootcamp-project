const express = require("express");
const router = express.Router();
module.exports = router;

//Ruta base : localhost:3000

router.get("/", (req, res) => {
  res.send("Hello World!");
});
