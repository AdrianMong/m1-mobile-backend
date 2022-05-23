const express = require("express");
const router = express.Router();
const matiereController = require("../controller/matiereController");

router.post("/create", matiereController.create);
router.get("/find/:id", matiereController.findById);
router.put("/update/:id", matiereController.update);
router.delete("/delete/:id", matiereController.delete);

module.exports = router;    