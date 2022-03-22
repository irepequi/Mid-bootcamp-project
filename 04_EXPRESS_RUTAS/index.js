const express = require("express");
const app = express();
const port = 3000;

//Establecemos las rutas base para cada uno de los archivos de ruta
const appRouter = require("./routes/app.js");
const userRouter = require("./routes/user.js");
const carRouter = require("./routes/car.js");

//capturar info de los form
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static(__dirname + "/public"));

app.use("/", appRouter);
app.use("/user", userRouter);
app.use("/car", carRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
