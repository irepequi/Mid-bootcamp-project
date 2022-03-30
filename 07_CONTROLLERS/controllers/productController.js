const connection = require("../config/db");

class ProductController {
  // Muestra el formulario de creación de producto
  viewFormProduct = (req, res) => {
    let seller_id = req.params.id;
    res.render("formProduct", { seller_id });
  };

  //   Añade un nuevo producto en la base de datos
  addProduct = (req, res) => {
    let { product_name, description, price } = req.body;
    let seller_id = req.params.seller_id;

    let sql = `INSERT INTO product (product_name, description, price, seller_id) VALUES ('${product_name}', '${description}', ${price}, ${seller_id})`;

    if (req.file != undefined) {
      let img = req.file.filename;
      sql = `INSERT INTO product (product_name, description, price, seller_id, product_img) VALUES ('${product_name}', '${description}', ${price}, ${seller_id}, '${img}')`;
    }

    connection.query(sql, (error, result) => {
      if (error) throw error;
      res.redirect(`/seller/oneSeller/${seller_id}`);
    });
  };

  //  Elimina la info de un producto
  deleteProduct = (req, res) => {
    let product_id = req.params.product_id;
    let seller_id = req.params.seller_id;
    let sql = `DELETE FROM product WHERE product_id = ${product_id}`;
    connection.query(sql, (err, result) => {
      if (err) throw err;
      res.redirect(`/seller/oneSeller/${seller_id}`);
    });
  };

  //   Muestra el formulario de edición de producto
  viewProductEditForm = (req, res) => {
    let product_id = req.params.product_id;
    let sql = `SELECT * FROM product WHERE product_id = ${product_id}`;
    connection.query(sql, (err, result) => {
      if (err) throw err;
      res.render("productEditForm", { result });
    });
  };

  //   Edita la información de un producto
  editProduct = (req, res) => {
    let product_id = req.params.product_id;
    let seller_id = req.params.seller_id;
    let { product_name, description, price } = req.body;

    let sql = `UPDATE product SET product_name = '${product_name}', description = '${description}', price = ${price} WHERE product_id = ${product_id}`;
    if (req.file != undefined) {
      let img = req.file.filename;
      sql = `UPDATE product SET product_name = '${product_name}', description = '${description}', price = ${price}, product_img = '${img}' WHERE product_id = ${product_id}`;
    }

    connection.query(sql, (error, result) => {
      if (error) throw error;
      res.redirect(`/seller/oneSeller/${seller_id}`);
    });
  };
}

module.exports = new ProductController();
