const express = require("express");
const router = express.Router();
const sectionController = require("../controller/sectionController");

router.post("/:lecon",  sectionController.create);

router.get("/lecon/:lecon", sectionController.findByLecon);
router.get("/:id", sectionController.findById);

router.put("/:id", sectionController.update);

router.delete("/:id", sectionController.delete);

module.exports = router;