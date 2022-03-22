const express = require("express");
const router = express.Router();
module.exports = router;

//Ruta base : localhost:3000/user

router.get("/perfil", (req, res) => {
  res.send("Estamos en el perfil de usuario");
});
