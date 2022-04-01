var express = require("express");
var router = express.Router();
const customerController = require("../controllers/customerController");

/* GET users listing. */
// FORM - 1 PARTE
// localhost:3000/customer/register
router.get("/formCustomer", customerController.showRegisterForm);

// FORM - 2 PARTE
// localhost:3000/customer/register
router.post(
  "/register",
  uploadImage("customer"),
  customerController.registerCustomer
);

// LOGIN
// localhost:3000/customer/login
router.post("/login", customerController.login);

// LOGIN
// localhost:3000/customer/showFormLogin
router.get("/showFormLogin", customerController.showFormLogin);

module.exports = router;
