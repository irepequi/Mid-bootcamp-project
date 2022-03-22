const express = require("express");
const router = express.Router();
module.exports = router;

//Ruta base: localhost:3000/tech/:articulo/:modelo/:precio
//Ruta base: localhost:3000/tech/televisor/sanyo23v/850

router.get("/:articulo/:modelo/:precio", (req, res) => {
  let { articulo, modelo, precio } = req.params;
  res.send(`Este ${articulo} - ${modelo}, cuesta ${precio}€`);
});
