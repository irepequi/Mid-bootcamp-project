const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();
const hostname = "localhost";
const port = 3000;

app.use(express.static(__dirname + "/public"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/formulario", (req, res) => {
  res.sendFile(__dirname + "/HTML/formulario.html");
});

app.get("/home/:casa/:metros/:habitaciones", (req, res) => {
  let { casa, metros, habitaciones } = req.params;
  res.send(
    `Esta ${casa} tiene ${metros} metros, y ${habitaciones} habitaciones`
  );
});

app.get("/inquilinos/:numInquilinos/:precioAlquiler", (req, res) => {
  let { numInquilinos, precioAlquiler } = req.params;
  res.send(
    `Tiene ${numInquilinos} inquilinos y su precio es de ${precioAlquiler}€`
  );
});

app.post("/datosFormulario", (req, res) => {
  let calle = req.body.street;
  let numero = req.body.number;
  let provincia = req.body.province;
  console.log(calle, numero, provincia);
  res.send("Su pedido se ha completado correctamente");
});

app.listen(port, () => {
  console.log(`Example app listening on port http://${hostname}:${port}/`);
});
