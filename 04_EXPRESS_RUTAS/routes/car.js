const express = require("express");
const router = express.Router();
module.exports = router;

//Ruta base : localhost:3000/car

router.get("/modelo/:color", (req, res) => {
  let color = req.params.color;
  res.send(`El color del coche es ${color}`);
});
