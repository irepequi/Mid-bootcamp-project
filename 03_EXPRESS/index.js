const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

//para la carpeta public
app.use(express.static(__dirname + "/public"));

//para parsear la info de los forms
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/* METODOS GET ---------------------- */
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/mi_html", (req, response) => {
  response.sendFile(__dirname + "/index.html");
});

app.get("/sobre_nosotros", (req, res) => {
  res.sendFile(__dirname + "/sobre_nosotros.html");
});

app.get("/ruta-dinamica/:id/:nombre/:apellido", (req, res) => {
  //let id = req.params.id;
  //let nombreDelParametro = req.params.nombre;
  let { id, nombre, apellido } = req.params;
  res.send(
    `Ha entrado en la ruta dinamica el parámetro dinámico es ${id} y el nombre es ${nombre} y el apellido es ${apellido}`
  );
});

app.get("/ruta-dinamica/:nombre/:apellido", (req, res) => {
  //let id = req.params.id;
  //let nombreDelParametro = req.params.nombre;
  let { nombre, apellido } = req.params;
  res.send(
    `Ha entrado en la ruta dinamica el nombre es ${nombre} y el apellido es ${apellido}`
  );
});

/* METODOS POST ---------------------- */
app.post("/datosFormulario", (req, res) => {
  let nombre = req.body.name;
  let apellido = req.body.lastname;
  console.log(nombre, apellido);
  res.send("Datos del formulario recogidos");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
