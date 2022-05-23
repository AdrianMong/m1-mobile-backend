const express = require("express");
const router = express.Router();
const AvancementController = require("../controller/avancementController");

router.post("/create", AvancementController.create);
router.get("/find/:id", AvancementController.findById);
router.put("/update/:id", AvancementController.update);
router.delete("/delete/:id", AvancementController.delete);


module.exports = router;