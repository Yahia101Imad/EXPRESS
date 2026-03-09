// IMPORT PACKAGE
const express = require("express");
const { protect } = require("../controllers/authController");
const {updatePassword, updateMe, deleteMe, getAllUsers} = require('../controllers/userController')

// ROUTING
const router = express.Router();

router.patch("/updatePassword",protect, updatePassword);
router.patch("/updateMe",protect, updateMe);
router.patch("/deleteMe",protect, deleteMe);
router.patch("/getAllUsers", getAllUsers);

// EXPORTS
module.exports = router;