const express = require("express");
const router = express.Router();
const chapitreController = require("../controller/chapitreController");

router.post("/create", chapitreController.create);
router.get("/find/:id", chapitreController.findById);
router.put("/update/:id", chapitreController.update);
router.delete("/delete/:id", chapitreController.delete);


module.exports = router;
