const express = require("express");
const {
  registerUser,
  loginUser,
  currentUser,
} = require("../controller.js/userController");
const validateToken = require("../middleware/validate-token");
const router = express.Router();
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/current", validateToken, currentUser);
module.exports = router;
