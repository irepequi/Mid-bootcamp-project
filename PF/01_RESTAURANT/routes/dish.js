const express = require("express");
const dishController = require("../controllers/dishController");
const uploadImage = require("../middleware/uploadFile");
const router = express.Router();

// Ruta base : localhost:3000/dish
router.get("/", dishController.showAllDish);

// localhost:3000/dish/selectChef
router.get("/selectChef", dishController.selectChef);

// localhost:3000/dish/saveDish/:chef_id
router.post(
  "/saveSelectChef",
  uploadImage("dishes"),
  dishController.saveSelectChef
);

// localhost:3000/dish/saveDish/:chef_id
router.post(
  "/saveSelectChef",
  uploadImage("dishes"),
  dishController.saveSelectChef
);

// localhost:3000/dish/form/:chef_id
router.get("/form/:chef_id", dishController.form);

// localhost:3000/dish/saveDish/:chef_id
router.post(
  "/saveDish/:chef_id",
  uploadImage("dishes"),
  dishController.saveDish
);

// localhost:3000/dish/editDish/:dish_id
router.get("/editDish/:dish_id", dishController.showEditformDish);

// localhost:3000/dish/saveChangesDish/:dish_id/:chef_id
router.post(
  "/saveChangesDish/:dish_id/:chef_id",
  uploadImage("dishes"),
  dishController.saveChangesDish
);

// localhost:3000/dish/logicDeleteDish/:dish_id/:chef_id
router.get(
  "/logicDeleteDish/:dish_id/:chef_id",
  dishController.logicDeleteDish
);

module.exports = router;
