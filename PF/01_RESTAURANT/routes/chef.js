var express = require("express");
const chefController = require("../controllers/chefController");
const uploadImage = require("../middleware/uploadFile");
var router = express.Router();

// Ruta base = localhost:3000/chef
router.get("/", chefController.showAllChef);

// localhost:3000/chef/form
router.get("/form", chefController.showRegisterForm);

// localhost:3000/chef/register
router.post("/register", uploadImage("chefs"), chefController.register);

// localhost:3000/chef/login
router.post("/login", chefController.login);

// localhost:3000/chef/showFormLogin
router.get("/showFormLogin", chefController.showFormLogin);

// localhost:3000/chef/profile/:chef_id
router.get("/profile/:chef_id", chefController.showProfile);

// localhost:3000/chef/showEditForm/:chef_id
router.get("/showEditForm/:chef_id", chefController.showEditForm);

// localhost:3000/chef/saveChangesChef/:chef_id
router.post(
  "/saveChangesChef/:chef_id",
  uploadImage("chefs"),
  chefController.saveChangesChef
);

// localhost:3000/chef/logicDelete/:chef_id
router.get("/logicDelete/:chef_id", chefController.logicDelete);

module.exports = router;
