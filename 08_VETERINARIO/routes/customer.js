var express = require("express");
const customerController = require("../controllers/customerController");
const uploadImage = require("../middleware/uploadFile");
const verify = require("./");
var router = express.Router();

// Ruta base = localhost:3000/customer
// localhost:3000/customer/form
router.get("/form", customerController.showRegisterForm);

// localhost:3000/customer/register
router.post(
  "/register",
  uploadImage("customers"),
  customerController.registerCustomer
);

// localhost:3000/customer/login
router.post("/login", customerController.login);

// localhost:3000/customer/showFormLogin
router.get("/showFormLogin", customerController.showFormLogin);

// localhost:3000/customer/oneCustomer/:customer_id
router.get(
  "/oneCustomer/:customer_id",
  verify,
  customerController.showOneCustomer
);

// localhost:3000/customer/showEditForm/:customer_id
router.get("/showEditForm/:customer_id", customerController.showEditForm);

// localhost:3000/customer/saveChangesCustomer/:customer_id
router.post(
  "/saveChangesCustomer/:customer_id",
  uploadImage("customers"),
  customerController.saveChangesCustomer
);

// localhost:3000/customer/logicDelete/:customer_id
router.get("/logicDelete/:customer_id", customerController.logicDelete);

module.exports = router;
