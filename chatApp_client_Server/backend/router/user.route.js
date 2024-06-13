const express = require("express")
const UserController = require("../controller/user.controller")
const { verifyToken } = require("../middlewere/verifyToken")
const router = express.Router()
router.post("/register", UserController.userRegister);
router.post("/login", UserController.login);
router.get("/search", verifyToken, UserController.SearchUser);


module.exports = router;