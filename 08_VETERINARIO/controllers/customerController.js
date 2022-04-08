const connection = require("../config/db");
const jwt = require("dotenv").config();
const sha1 = require("sha1");
const bcrypt = require("bcrypt");

class CustormerController {
  // Muestra el formulario de registro de customer
  showRegisterForm = (req, res) => {
    res.render("form");
  };

  //   Registra un nuevo customer
  registerCustomer = (req, res) => {
    let { name, phone, address, email, password } = req.body;
    // let encryptedPass = sha1(password);
    bcrypt.hash(password, 8, (error, result) => {
      if (error) throw error;
      let encryptedPass = result;

      let sql = `INSERT INTO customer (name, phone, address, email, password) VALUES ('${name}', '${phone}', '${address}', '${email}', '${encryptedPass}')`;

      if (req.file != undefined) {
        let img = req.file.filename;

        sql = `INSERT INTO customer (name, phone, address, email, password, img) VALUES ('${name}', '${phone}', '${address}', '${email}', '${encryptedPass}', '${img}')`;
      }

      connection.query(sql, (error, result) => {
        if (error) throw error;
        res.render("login", { result: "" });
      });
    });
  };

  // Logueo del customer con bcrypt
  login = (req, res) => {
    let { email, password } = req.body;

    let sql = `SELECT password, customer_id FROM customer WHERE email = '${email}'`;

    connection.query(sql, (error, result) => {
      if (error) throw error;
      if (result.length == 0) {
        res.render("login", { result: "Las credenciales no son correctas" });
      } else {
        let encryptedPass = result[0].password;
        bcrypt.compare(password, encryptedPass, (error, result_compare) => {
          if (result_compare) {
            const token = jwt.sign(
              { id: result[0].customer_id, nombre: "irene" },
              process.env.SECRET_KEY,
              { expiresIn: "5 min" }
            );
            console.log(token);

            res.redirect(`/customer/oneCustomer/${result[0].customer_id}`);
          } else {
            res.render("login", {
              result: "Las credenciales no son correctas",
            });
          }
        });
      }
    });
  };

  //   Muestra la vista del formulario de Logueo
  showFormLogin = (req, res) => {
    res.render("login", { result: "" });
  };

  //   Muestra la vista de un customer con sus mascotas
  showOneCustomer = (req, res) => {
    let customer_id = req.params.customer_id;
    let sql = `SELECT * FROM customer WHERE customer_id = ${customer_id}`;
    let sql2 = `SELECT * FROM pet WHERE customer_id = ${customer_id} AND deleted = 0`;

    connection.query(sql, (error, resultCustomer) => {
      if (error) throw error;
      connection.query(sql2, (error, resultPet) => {
        if (error) throw error;
        res.render("oneCustomer", { resultCustomer, resultPet });
      });
    });
  };

  // Muestra la vista del formulario de edición de usuario

  showEditForm = (req, res) => {
    let customer_id = req.params.customer_id;
    let sql = `SELECT * FROM customer WHERE customer_id = ${customer_id}`;
    connection.query(sql, (error, result) => {
      if (error) throw error;
      res.render("editCustomer", { result });
    });
  };

  // Guarda los cambios del formulario de edición de cliente

  saveChangesCustomer = (req, res) => {
    let customer_id = req.params.customer_id;
    let { name, address, phone, password, email } = req.body;
    console.log(req.body);
    let sql = `UPDATE customer SET name = '${name}', address = '${address}', phone = '${phone}', email = '${email}'`;

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

    sql += `WHERE customer_id = ${customer_id}`;

    connection.query(sql, (error, result) => {
      if (error) throw error;
      res.redirect(`/customer/oneCustomer/${customer_id}`);
    });
  };

  // Borrado lógico del cliente
  logicDelete = (req, res) => {
    let customer_id = req.params.customer_id;
    let sql = `UPDATE customer SET deleted = 1 WHERE customer_id = ${customer_id}`;
    let sql2 = `UPDATE pet SET deleted = 1 WHERE customer_id = ${customer_id}`;
    connection.query(sql, (error, result) => {
      if (error) throw error;
      connection.query(sql2, (error, result) => {
        if (error) throw error;
        res.redirect("/pet");
      });
    });
  };
}
module.exports = new CustormerController();
