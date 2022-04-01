const express = require("express");
const router = express.Router();
const petController = require("../controllers/petController");

/* GET users listing. */
router.get("/", petController.showHome);

module.exports = router;
