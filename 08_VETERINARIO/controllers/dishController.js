const connection = require("../config/db");

class DishController {
  //  Muestra HOME con todas las mascotas
  showHome = (req, res) => {
    let sql = `SELECT * FROM dish`;

    connection.query(sql, (error, result) => {
      if (error) throw error;
      res.render("index", { result });
    });
  };
}

module.exports = new DishController();
