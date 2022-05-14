const express = require("express");
const router = express.Router();
const questionController = require("../controller/questionController");

router.post("/",  questionController.create);

router.get("/lecon/:lecon", questionController.findByLecon);
router.get("/:id", questionController.findById);

router.put("/:id", questionController.update);

router.delete("/:id", questionController.delete);

module.exports = router;