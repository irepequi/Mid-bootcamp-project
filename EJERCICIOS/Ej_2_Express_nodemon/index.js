const express = require("express");
const app = express();
const hostname = "localhost";
const port = 3000;

app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/home", (req, response) => {
  response.sendFile(__dirname + "/index.html");
});

app.get("/ruta-dinamica/:nombre/:apellido", (req, res) => {
  let { nombre, apellido } = req.params;
  res.send(
    `Ha entrado en la ruta dinamica el nombre es ${nombre} y el apellido es ${apellido}`
  );
});

app.get("/enlace", (req, response) => {
  response.sendFile(__dirname + "/enlace.html");
});

app.listen(port, () => {
  console.log(`Example app listening on port http://${hostname}:${port}/`);
});
