const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middlewere/verifyToken.js")
const ChatController = require("../controller/chat.contoller.js")

router.post("/fetch", verifyToken, ChatController.fetchChat);
router.post("/access", verifyToken, ChatController.accessChat);
router.post("/add-group", verifyToken, ChatController.addToGroup);
router.post("/create-group", verifyToken, ChatController.CreateGroup);
router.post("/rename-group", verifyToken, ChatController.renameGroup);
router.post("/remove-from-group", verifyToken, ChatController.removeFromGroup);

module.exports = router;