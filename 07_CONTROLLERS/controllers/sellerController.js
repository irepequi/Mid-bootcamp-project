const connection = require("../config/db");
var express = require("express");

var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

class SellerController {
  // Muestra la vista home con todos los vendedores
  viewHome = (req, res) => {
    let sql = `SELECT * FROM seller`;
    connection.query(sql, (error, result) => {
      if (error) throw error;
      res.render("index", { result });
    });
  };

  // Renderiza la vista del formulario de registro
  renderCreateForm = (req, res) => {
    res.render("form");
  };

  //   Crea un nuevo vendedor
  createSeller = (req, res) => {
    let { name, phone, email } = req.body;

    let sql = `INSERT INTO seller (name, phone, email) VALUES ('${name}', '${phone}', '${email}')`;

    if (req.file != undefined) {
      let img = req.file.filename;
      sql = `INSERT INTO seller (name, phone, email, img) VALUES ('${name}', '${phone}', '${email}', '${img}')`;
    }

    connection.query(sql, (error, result) => {
      if (error) throw error;
      let id = result.insertId;
      res.redirect(`/seller/oneSeller/${id}`);
    });
  };

  //   Muestra la vista de un usuario
  viewOneSeller = (req, res) => {
    let id = req.params.id;
    let sql = `SELECT * FROM seller WHERE seller_id = ${id}`;
    let sql2 = `SELECT * FROM product WHERE seller_id = ${id}`;
    connection.query(sql, (error, result) => {
      if (error) throw error;
      connection.query(sql2, (err, result2) => {
        if (err) throw err;
        res.render("oneSeller", { result, result2 });
      });
    });
  };

  //  Elimina el perfil de un vendedor
  deleteSeller = (req, res) => {
    let seller_id = req.params.id;
    let sql = `DELETE FROM seller WHERE seller_id = ${seller_id}`;
    connection.query(sql, (err, result) => {
      if (err) throw err;
      res.redirect(`/seller`);
    });
  };

  //   Muestra el formulario de edición de vendedor
  viewSellerEditForm = (req, res) => {
    let seller_id = req.params.seller_id;
    let sql = `SELECT * FROM seller WHERE seller_id = ${seller_id}`;
    connection.query(sql, (err, result) => {
      if (err) throw err;
      res.render("sellerEditForm", { result });
    });
  };

  //   Edita la información de un vendedor
  editSeller = (req, res) => {
    let seller_id = req.params.seller_id;
    let { name, phone, email } = req.body;

    let sql = `UPDATE seller SET name = '${name}', phone = '${phone}', email = '${email}' WHERE seller_id = ${seller_id}`;
    if (req.file != undefined) {
      let img = req.file.filename;
      sql = `UPDATE seller SET name = '${name}', phone = '${phone}', email = '${email}' WHERE seller_id = ${seller_id}, img = '${img}' WHERE seller_id = ${seller_id}`;
    }

    connection.query(sql, (error, result) => {
      if (error) throw error;
      res.redirect(`/seller`);
    });
  };
}

module.exports = new SellerController();
