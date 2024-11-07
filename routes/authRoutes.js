const express = require("express");
const {
  login,
  singup,
  setNewPassword,
  updateProfile,
} = require("../controllers/authController");

const router = express.Router();

router.post("/login", login);
router.post("/signup", singup);
router.post("/updateProfile/:userId", updateProfile);

module.exports = router;
