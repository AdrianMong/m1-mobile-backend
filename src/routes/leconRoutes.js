const express = require("express");
const router = express.Router();
const leconController = require("../controller/leconController");

router.post("/create", leconController.create);
router.get("/find/:id", leconController.findById);
router.put("/update/:id", leconController.update);
router.delete("/delete/:id", leconController.delete);


module.exports = router;