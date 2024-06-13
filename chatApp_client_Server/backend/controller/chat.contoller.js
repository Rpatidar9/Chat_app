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
const fetchChat = asyncHandler(async (req, res) => {
    var chats = await Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
        .populate("latestMessage")
        .populate("users", "-password")
        .populate("groupAdmin", "-password")
        .sort({ updated: -1 });

    chats = await User.populate(chats, { path: "latestMessage.sender", select: "-password" })
    res.status(200).json(new ApiResponse(200, chats, "Successfully Fetch Chat"))
})
const CreateGroup = asyncHandler(async (req, res) => {
    if (!req.body.users && !req.body.name) {
        throw new ApiError(400, "All field is required")
    }
    const users = JSON.parse(req.body.users);
    if (users.length < 2) {
        throw new ApiError(400, "At least 2 users required")
    }
    const groupChat = await Chat.create({ chatName: req.body.name, isGroupChat: true, users: users, groupAdmin: req.user._id });
    const fullChat = await Chat.findOne({ _id: groupChat._id }).populate("latestMessage").populate("users", "-password");
    res.status(201).json(new ApiResponse(201, fullChat, "Successfully Create Group Chat"))
})
const RenameGroup = asyncHandler(async (req, res) => {
    if (!req.body.name && req.body.chatId) {
        throw new ApiError(400, "All field is required")
    }
    const updatedChat = await Chat.findByIdAndUpdate(req.body.chatId, { chatName: req.body.name }, { new: true }).populate("latestMessage").populate("users", "-password");
    res.status(200).json(new ApiResponse(200, updatedChat, "Successfully Rename Group Chat"))

})
const addToGroup = asyncHandler(async (req, res) => {
    const { chatId, userId } = req.body;
    const updatedChat = await Chat.findByIdAndUpdate(chatId, { $push: { users: userId } }, { new: true }).populate("latestMessage").populate("users", "-password");
    res.status(200).json(new ApiResponse(200, updatedChat, "Successfully Add User to Group Chat"))
})
const removeFromGroup = asyncHandler(async (req, res) => {
    const { chatId, userId } = req.body;
    const updatedChat = await Chat.findByIdAndUpdate(chatId, { $pull: { users: userId } }, { new: true }).populate("latestMessage").populate("users", "-password");
    res.status(200).json(new ApiResponse(200, updatedChat, "Successfully Remove User from Group Chat"))
})
module.exports = { accessChat, fetchChat, CreateGroup, RenameGroup, addToGroup, removeFromGroup } 