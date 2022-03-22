const express = require("express");
const path = require("path");
const router = express.Router();
module.exports = router;

//Ruta base: localhost:3000/user

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/../HTML/formulario.html"));
});

//localhost:3000/user/datosFormulario
router.post("/datosFormulario", (req, res) => {
  let nombre = req.body.name;
  let apellido = req.body.surname;
  let edad = req.body.age;
  let altura = req.body.height;
  let trabajo = req.body.job;
  console.log(nombre, apellido, edad, altura, trabajo);
  res.send(
    `Su resultado es:
    Nombre: ${nombre}
    Apellido: ${apellido}
    Edad: ${edad}
    Altura: ${altura}
    Trabajo: ${trabajo}`
  );
});
