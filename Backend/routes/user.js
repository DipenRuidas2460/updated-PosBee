const express = require("express");
const router = express.Router();

const { updateUser, getUsers, getUserById, updatePassword } = require("../controller/userController");

router.post("/update", updateUser);
router.patch("/updatePassword", updatePassword);
router.get("/getUserById", getUserById);
router.get("/user", getUsers);

module.exports = router;
