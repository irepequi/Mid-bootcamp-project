const connection = require("../config/db");
const sha1 = require("sha1");

class ChefController {
  //  Muestra la vista de todos los chefs
  showAllChef = (req, res) => {
    let sql = `SELECT * FROM chef WHERE deleted = 0`;

    connection.query(sql, (error, result) => {
      if (error) throw error;
      res.render("allChef", { result });
    });
  };

  //  Muestra el formulario de registro de chef
  showRegisterForm = (req, res) => {
    res.render("formChef");
  };

  //   Registra un nuevo chef
  register = (req, res) => {
    let { chef_name, last_name, email, password, phone, chef_description } =
      req.body;
    let encryptedPass = sha1(password);

    let sql = `INSERT INTO chef (chef_name, last_name, email, password, phone, chef_description) VALUES ('${chef_name}', '${last_name}', '${email}', '${encryptedPass}', '${phone}', '${chef_description}')`;

    if (req.file != undefined) {
      let img = req.file.filename;

      sql = `INSERT INTO chef (chef_name, last_name, email, password, phone, chef_description, img) VALUES ('${chef_name}', '${last_name}', '${email}', '${encryptedPass}', '${phone}', '${chef_description}', '${img}')`;
    }

    connection.query(sql, (error, result) => {
      if (error) throw error;
      res.render("login", { result: "" });
    });
  };

  //   Logueo del chef
  login = (req, res) => {
    let { email, password } = req.body;
    let encryptedPass = sha1(password);

    let sql = `SELECT chef_id FROM chef WHERE email = '${email}' AND password = '${encryptedPass}' `;

    connection.query(sql, (error, result) => {
      if (error) throw error;
      console.log(result);

      if (result.length === 0) {
        res.render("login", { result: "Las credenciales no son correctas" });
      } else {
        res.redirect(`/chef/profile/${result[0].chef_id}`);
      }
    });
  };

  //   Muestra la vista del formulario de Logueo
  showFormLogin = (req, res) => {
    res.render("login", { result: "" });
  };

  //   Muestra la vista de un chef con sus platos
  showProfile = (req, res) => {
    let chef_id = req.params.chef_id;
    let sql = `SELECT * FROM chef WHERE chef_id = ${chef_id}`;
    let sql2 = `SELECT * FROM dish WHERE chef_id = ${chef_id} AND deleted = 0`;

    connection.query(sql, (error, resultChef) => {
      if (error) throw error;
      connection.query(sql2, (error, resultDish) => {
        if (error) throw error;
        res.render("profile", { resultChef, resultDish });
      });
    });
  };

  //  Muestra la vista del formulario de edición de chef
  showEditForm = (req, res) => {
    let chef_id = req.params.chef_id;
    let sql = `SELECT * FROM chef WHERE chef_id = ${chef_id}`;

    connection.query(sql, (error, result) => {
      if (error) throw error;
      res.render("editChef", { result });
    });
  };

  // Guarda los cambios del formulario de edición de chef
  saveChangesChef = (req, res) => {
    let chef_id = req.params.chef_id;
    let { chef_name, last_name, email, password, phone, chef_description } =
      req.body;
    let sql = `UPDATE chef SET chef_name = '${chef_name}', last_name = '${last_name}', email = '${email}', phone = '${phone}', chef_description = '${chef_description}'`;

    if (password != "") {
      let encryptedPass = sha1(password);
      sql += `, password ='${encryptedPass}'`;
    }
    if (req.file != undefined) {
      let img = req.file.filename;
      sql += `, img = '${img}'`;
    }
    if (req.file != undefined && password != "") {
      let img = req.file.filename;
      let encryptedPass = sha1(password);
      sql += `, password ='${encryptedPass}',  img = '${img}' `;
    }

    sql += `WHERE chef_id = ${chef_id}`;

    connection.query(sql, (error, result) => {
      if (error) throw error;
      res.redirect(`/chef/profile/${chef_id}`);
    });
  };

  // Borrado lógico del chef
  logicDelete = (req, res) => {
    let chef_id = req.params.chef_id;
    let sql = `UPDATE chef SET deleted = 1 WHERE chef_id = ${chef_id}`;
    let sql2 = `UPDATE dish SET deleted = 1 WHERE chef_id = ${chef_id}`;

    connection.query(sql, (error, result) => {
      if (error) throw error;

      connection.query(sql2, (error, result) => {
        if (error) throw error;
        res.redirect(`/chef`);
      });
    });
  };
}
module.exports = new ChefController();
