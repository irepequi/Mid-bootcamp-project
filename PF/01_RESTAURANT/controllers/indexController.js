const connection = require("../config/db");
const sha1 = require("sha1");

class IndexController {
  showHome = (req, res) => {
    let sql = `SELECT * FROM chef WHERE deleted = 0`;
    let sql2 = `SELECT * FROM dish WHERE deleted = 0`;

    connection.query(sql, (error, resultChef) => {
      if (error) throw error;
      connection.query(sql2, (error, resultDish) => {
        if (error) throw error;
        res.render("index", { resultChef, resultDish });
      });
    });
  };
}

module.exports = new IndexController();
