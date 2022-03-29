var express = require("express");
const connection = require("../config/db");
const uploadImage = require("../middleware/multer");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res) {
  res.send("respond with a resource");
});

// localhost:3000/users/:id
router.get("/:id", (req, res) => {
  let id = req.params.id;
  let sql = `SELECT * FROM user WHERE user_id = ${id}`;
  connection.query(sql, (error, resultOneUser) => {
    if (error) throw error;
    res.render("oneUser", { resultOneUser });
  });
});

router.get("/", (req, res) => {
  let sql = "SELECT * FROM user"; //consulta a la DB
  connection.query(sql, (error, result) => {
    if (error) throw error;
    console.log(result);
    res.render("index", { result });
  });
});

// DELETE
// localhost:3000/deleteUser/:id
router.get("/deleteUser/:id", (req, res) => {
  let id = req.params.id;
  let sql = `DELETE FROM user WHERE user_id = ${id}`;
  connection.query(sql, (error, result) => {
    if (error) throw error;
    res.redirect("/");
  });
});

// FORM
router.post("/", (req, res) => {
  let { name, description, phone, email } = req.body;
  let sql = `INSERT INTO user (name, description, phone, email, img) VALUES ("${name}", "${description}", "${phone}", "${email}", "${img}")`;

  if (req.file != undefined) {
    let img = req.file.filename;
    sql = `INSERT INTO user (name, description, phone, email, img) VALUES ("${name}", "${description}", "${phone}", "${email}", "${img}")`;
  }

  connection.query(sql, (error, resultInsert) => {
    if (error) throw error;
    console.log(resultInsert);
    res.send("Usuario introducido correctamente");
  });
});

module.exports = router;
