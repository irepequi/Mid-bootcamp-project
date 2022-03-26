var express = require("express");
const connection = require("../config/db");
var router = express.Router();

/* GET home page. */
router.get("/", (req, res) => {
  let sql = "SELECT * FROM user"; //consulta a la DB
  connection.query(sql, (error, result) => {
    if (error) throw error;
    console.log(result);
    res.render("index", { result, title: "Castillo" });
  });
});

// localhost:3000/users/:id
router.get("/users/:id", (req, res) => {
  let id = req.params.id;
  let sql = `SELECT * FROM user WHERE user_id = ${id}`;
  connection.query(sql, (error, resultOneUser) => {
    if (error) throw error;
    res.render("oneUser", { resultOneUser, title: "Castillo" });
  });
});

router.post("/", (req, res) => {
  let { name, description, phone, email } = req.body;
  let sql = `INSERT INTO user (name, description, phone, email) VALUES ("${name}", "${description}", "${phone}", "${email}")`;
  connection.query(sql, (error, resultInsert) => {
    if (error) throw error;
    console.log(resultInsert);
    res.send("Usuario introducido correctamente");
  });
});

module.exports = router;
