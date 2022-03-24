var express = require("express");
const connection = require("../config/db");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

//localhost:3000/users/allUsers
router.get("/allUsers", (req, res) => {
  let sql = "SELECT * FROM user"; //consulta a la DB
  connection.query(sql, (error, result) => {
    if (error) throw error;
    console.log(result);
    res.render("index", { result });
  });
});

router.post("/", (req, res) => {
  let { name, surname, email } = req.body;
  let sql = `INSERT INTO user (name, surname, email) VALUES ("${name}", "${surname}", "${email}")`;
  connection.query(sql, (error, resultInsert) => {
    if (error) throw error;
    console.log(resultInsert);
    res.send("Usuario introducido correctamente");
  });
});

//localhost:3000/users/viewForm
router.get("/viewForm", (req, res) => {
  res.render("form");
});

// localhost:3000/users/oneUser/:id
router.get("/oneUser/:id", (req, res) => {
  let id = req.params.id;
  let sql = `SELECT * FROM user WHERE user_id = ${id}`;
  connection.query(sql, (error, resultOneUser) => {
    if (error) throw error;
    res.render("oneUser", { resultOneUser });
  });
});

module.exports = router;
