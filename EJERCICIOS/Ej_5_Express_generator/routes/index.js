var express = require("express");
const connection = require("../config/db");
const uploadImage = require("../middleware/multer");
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
router.get("/", (req, res) => {
  let id = req.params.id;
  let sql = `SELECT * FROM user WHERE user_id = ${id}`;
  connection.query(sql, (error, result) => {
    if (error) throw error;
    res.render("index", { result, title: "Castillo" });
  });
});

router.post("/", uploadImage(), (req, res) => {
  let { name, description, phone, email } = req.body;
  let img = req.file.filename;
  let sql = `INSERT INTO user (name, description, phone, email, img) VALUES ("${name}", "${description}", "${phone}", "${email}", "${img}")`;
  connection.query(sql, (error, resultInsert) => {
    if (error) throw error;
    console.log(resultInsert);
    res.redirect("/");
  });
});

module.exports = router;
