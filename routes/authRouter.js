// IMPORT PACKAGE
const express = require("express");
const { signup, login, forgotPassword, resetPassword, updatePassword, protect } = require("../controllers/authController");

// ROUTING
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/forgotPassword", forgotPassword);
router.patch("/resetPassword/:token", resetPassword);
router.patch("/updatePassword",protect, updatePassword);

// EXPORTS
module.exports = router;
