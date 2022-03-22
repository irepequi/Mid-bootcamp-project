const express = require("express");
const path = require("path");
const app = express();
const port = 3000;

//Establecemos las rutas base para cada uno de los archivos de ruta
const indexRouter = require("./routes/index.js");
const cityRouter = require("./routes/city.js");
const userRouter = require("./routes/user.js");
const techRouter = require("./routes/technology.js");

//capturar info de los form
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static(__dirname + "/public"));

app.use("/", indexRouter);
app.use("/city", cityRouter);
app.use("/user", userRouter);
app.use("/tech", techRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
