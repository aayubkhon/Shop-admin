const express = require("express");
const router = express.Router();
const memberController = require('./controllers/memberController')

router.get("/", function (req, res) {
  res.send("Home");
});

router.get("/", memberController.home)
router.post("/signup", memberController.signup)
router.post("/login", memberController.login)
router.get("/logout", memberController.logout)

module.exports = router;
