const express = require("express");
const petController = require("../controllers/petController");
const uploadImage = require("../middleware/uploadFile");
const router = express.Router();

// Ruta base : localhost:3000/pet

// localhost:3000/pet
router.get("/", petController.showHome);

// localhost:3000/pet/showForm/:customer_id
router.get("/showForm/:customer_id", petController.showForm);

// localhost:3000/pet/savePet/:customer_id
router.post(
  "/savePet/:customer_id",
  uploadImage("pets"),
  petController.savePet
);

// localhost:3000/pet/editPet/:pet_id
router.get("/editPet/:pet_id", petController.showEditPetForm);

// localhost:3000/pet/saveChangesPet/:pet_id/:customer_id
router.post(
  "/saveChangesPet/:pet_id/:customer_id",
  uploadImage("pets"),
  petController.saveChangesPet
);

// localhost:3000/pet/deletePet/:pet_id/:customer_id
router.get("/deletePet/:pet_id/:customer_id", petController.deletePet);

// localhost:3000/pet/logicDeletePet/:pet_id/:customer_id

router.get(
  "/logicDeletePet/:pet_id/:customer_id",
  petController.logicDeletePet
);

module.exports = router;
