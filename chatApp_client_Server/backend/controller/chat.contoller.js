const { asyncHandler } = require("../utills/asynHandler.js")
const Chat = require("../models/chat.model.js");
const User = require("../models/user.model.js");
const { ApiError } = require("../utills/ApiError.js")
const { ApiResponse } = require("../utills/ApiResponse.js");


const accessChat = asyncHandler(async (req, res) => {
    const UserId = req.body.userId;
    if (!UserId) {
        throw new ApiError(400, "All field is required")
    }
    var isChat = await Chat.findOne({
        isGroupChat: false,
        $and: [{ users: { $elemMatch: { $eq: req.user._id } } },
        { users: { $elemMatch: { $eq: UserId } } }]
    }).populate("latestMessage").populate("users", "-password");
    isChat = await User.populate(isChat, { path: "latestMessage.sender", select: "-password" })
    if (isChat !== null && isChat.length > 0) {
        res.status(200).json(new ApiResponse(200, isChat, "Successfully Access Chat"))
    } else {
        var chatData = {
            chatName: "sender",
            isGroupChat: false,
            users: [req.user._id, UserId],
        }
        try {
            const newChat = await Chat.create(chatData);
            const fullChat = await Chat.findOne({ _id: newChat._id }).populate("latestMessage").populate("users", "-password");
            res.status(201).json(new ApiResponse(201, fullChat, "Successfully Create Chat"))
        } catch (error) {
            res.status(400).json(new ApiResponse(400, error, "Failed to Create Chat"))
        }
    }
})
module.exports = { accessChat } 