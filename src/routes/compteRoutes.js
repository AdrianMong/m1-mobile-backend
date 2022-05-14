const express = require("express");
const router = express.Router();
const compteController = require("../controller/compteController");

router.post("/signup", compteController.signup);

module.exports = router;