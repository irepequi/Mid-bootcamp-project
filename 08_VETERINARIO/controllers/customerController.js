const connection = require("../config/db");
const sha1 = require("sha1");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
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
        // if (error) throw error;
        // res.render("login", { result: "" });
        error
          ? res.status(400).json({ error })
          : res.status(200).json("todo correcto");
      });
    });
  };

  // //   Logueo del customer
  // login = (req, res) => {
  //   let { email, password } = req.body;
  //   let encryptedPass = sha1(password);

  //   let sql = `SELECT customer_id FROM customer WHERE email = '${email}' AND password = '${encryptedPass}' `;
  //   connection.query(sql, (error, result) => {
  //     if (error) throw error;
  //     console.log(result);
  //     if (result.length === 0) {
  //       res.render("login", { result: "Las credenciales no son correctas" });
  //     } else {
  //       res.redirect(`/customer/oneCustomer/${result[0].customer_id}`);
  //     }
  //   });
  // };

  // Logueo del customer con bcrypt
  login = (req, res) => {
    let { email, password } = req.body;
    let sql = `SELECT password, customer_id FROM customer WHERE email = '${email}'`;
    connection.query(sql, (error, result) => {
      if (error) throw error;
      if (result.length == 0) {
        // res.render("login", { result: "Las credenciales no son correctas" });
        res.status(401).json("credenciales incorrectas");
      } else {
        let encryptedPass = result[0].password;
        bcrypt.compare(password, encryptedPass, (error, result_compare) => {
          if (result_compare) {
            const token = jwt.sign(
              { id: result[0].customer_id, nombre: "miriam" },
              process.env.SECRET_KEY,
              { expiresIn: "1 min" }
            );
            console.log(token);

            // res.redirect(`/customer/oneCustomer/${result[0].customer_id}`);
            res.status(200).json(token);
          } else {
            // res.render("login", {
            //   result: "Las credenciales no son correctas",
            // });
            res.status(401).json("credenciales incorrectas");
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
      // if (error) throw error;
      if (error) res.status(400).json({ error });
      connection.query(sql2, (error, resultPet) => {
        // if (error) throw error;
        // res.render("oneCustomer", { resultCustomer, resultPet });
        error
          ? res.status(400).json({ error })
          : res.status(200).json("todo correcto");
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
