const connection = require("../config/db");

class DishController {
  // Muestra la vista con todas los platos
  showAllDish = (req, res) => {
    let sql = `SELECT * FROM dish WHERE deleted = 0`;

    connection.query(sql, (error, result) => {
      if (error) throw error;
      res.render("allDish", { result });
    });
  };

  // Muestra select para elegir chef
  selectChef = (req, res) => {
    let sql = `SELECT * FROM chef WHERE deleted = 0`;

    connection.query(sql, (error, result) => {
      if (error) throw error;
      res.render("selectChef", { result });
    });
  };

  //  Muestra el formulario de crear platos
  form = (req, res) => {
    let chef_id = req.params.chef_id;
    res.render("formDish", { chef_id });
  };

  // Guarda un nuevo plato
  saveDish = (req, res) => {
    let { dish_name, dish_description } = req.body;
    let chef_id = req.params.chef_id;

    let sql = `INSERT INTO dish (dish_name, dish_description, chef_id) VALUES ('${dish_name}', '${dish_description}', '${chef_id}') `;

    if (req.file != undefined) {
      let dish_img = req.file.filename;
      sql = `INSERT INTO dish (dish_name, dish_description, chef_id, dish_img) VALUES ('${dish_name}', '${dish_description}', '${chef_id}', '${dish_img}') `;
    }

    connection.query(sql, (error, result) => {
      if (error) throw error;
      res.redirect(`/chef/profile/${chef_id}`);
    });
  };

  // Muestra el formulario de edición de platos
  showEditformDish = (req, res) => {
    let dish_id = req.params.dish_id;
    let sql = `SELECT * FROM dish WHERE dish_id = ${dish_id}`;

    connection.query(sql, (error, result) => {
      if (error) throw error;
      res.render("editDish", { result });
    });
  };

  // Guarda los cambios del formulario de edición de platos
  saveChangesDish = (req, res) => {
    let { dish_name, dish_description } = req.body;
    let { dish_id, chef_id } = req.params;
    let sql = `UPDATE dish SET dish_name = '${dish_name}', dish_description = '${dish_description}' WHERE dish_id = ${dish_id}`;

    if (req.file != undefined) {
      let dish_img = req.file.filename;
      sql = `UPDATE dish SET dish_name = '${dish_name}', dish_description = '${dish_description}', dish_img = '${dish_img}' WHERE dish_id = ${dish_id}`;
    }

    connection.query(sql, (error, result) => {
      if (error) throw error;
      res.redirect(`/chef/profile/${chef_id}`);
    });
  };

  // Elimina de manera lógica un plato
  logicDeleteDish = (req, res) => {
    let { dish_id, chef_id } = req.params;
    let sql = `UPDATE dish SET deleted = 1 WHERE dish_id = ${dish_id}`;

    connection.query(sql, (error, result) => {
      if (error) throw error;
      res.redirect(`/chef/profile/${chef_id}`);
    });
  };
}

module.exports = new DishController();
