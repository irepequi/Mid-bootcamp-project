const connection = require("../config/db");
const sha1 = require("sha1");
const uploadImage = require("../middleware/uploadFile");

class CustomerController {
  //  Muestra la vista del form de customer
  showRegisterForm = (req, res) => {
    res.render("formCustomer");
  };

  //  Registra un nuevo customer
  registerCustomer = (req, res) => {
    let { name, phone, address, email, password } = req.body;
    let encryptedPass = sha1(password);

    let sql = `INSERT INTO customer (name, phone, address, email, password) VALUES ('${name}', '${phone}', '${address}', '${email}', '${encryptedPass}')`;

    if (req.file != undefined) {
      let img = req.file.filename;
      sql = `INSERT INTO customer (name, phone, address, email, password, img) VALUES ('${name}', '${phone}', '${address}', '${email}', '${encryptedPass}', '${img}')`;
    }

    connection.query(sql, (error, result) => {
      if (error) throw error;
      res.render("login", { result: "" });
    });
  };

  //  Login del customer desde el register
  login = (req, res) => {
    let { email, password } = req.body;
    let encryptedPass = sha1(password);

    let sql = `SELECT customer_id FROM customer WHERE email = '${email}' AND password = '${encryptedPass}')`;

    connection.query(sql, (error, result) => {
      if (error) throw error;
      console.log(result);
      result.length === 0
        ? res.render("login", { result: "Las credenciales no son correctas" })
        : res.redirect(`/customer/oneCustomer/${result[0].customer_id}`);
    });
  };

  //  Login del customer
  showFormLogin = (req, res) => {
    res.render("login", { result: "" });
  };
}

module.exports = new CustomerController();
