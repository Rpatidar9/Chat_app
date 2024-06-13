const { asyncHandler } = require("../utills/asynHandler.js")
const Chat = require("../models/chat.model.js")

const accessChat = asyncHandler(async (req, res) => {
    const UserId = req.body.UserId;
    if (!UserId) {
        throw new ApiError(400, "All field is required")
    }
    const Chat = await Chat.findOne({ isGroupChat: false, $and: [{ users: { $elemMatch: { $eq: req.user._id } } }, { users: { $elemMatch: { $eq: UserId } } }] }).populate("latestMessage").populate("users", "-password");
})