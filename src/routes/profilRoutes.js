const express = require("express");
const router = express.Router();
const profilController = require("../controller/profilController");
const Authentication = require("../utils/authentication");

router.post("/", Authentication.checkToken, profilController.create);

router.get("/", Authentication.checkToken, profilController.findAll);
router.get("/:id", Authentication.checkToken, profilController.findOne);

router.put("/:id", Authentication.checkToken, profilController.update);

router.delete("/:id", Authentication.checkToken, profilController.delete);

module.exports = router;