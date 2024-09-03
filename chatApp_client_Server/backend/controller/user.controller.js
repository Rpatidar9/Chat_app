const User = require("../models/user.model")
const bcrypt = require("bcrypt")
const jsonwebtoken = require("jsonwebtoken")
const { ApiError } = require("../utills/ApiError.js")
const { ApiResponse } = require("../utills/ApiResponse.js")
const { asyncHandler } = require("../utills/asynHandler.js")

const userRegister = asyncHandler(async (req, res) => {
    const { name, email, password, } = req.body
    if (!name || !email || !password) {
        throw new ApiError(400, "All field is required")
    }
    const salt = await bcrypt.genSalt(10);
    const new_password = await bcrypt.hash(password, salt)
    const RegisterUser = await User.create({
        email: req.body.email,
        name: req.body.name,
        password: new_password
    })
    res.status(201).json(new ApiResponse(200, { RegisterUser }, "Successfully Register"));

});
const login = asyncHandler(async (req, res) => {

    const { email, password } = req.body
    if (!email || !password) {
        throw new ApiError(400, "All field is required")
    }
    const user = await User.findOne({ email: email })
    if (!user) {
        throw new ApiError(404, "User not found")
    }
    await user.comparePassword(password, user.password, (err, isMatch) => {
        if (err) throw err;
        if (!isMatch) {
            res.status(400).json(new ApiResponse(400, "Password is not correct", "Password is not correct"))
        }
    })
    const token = user.generateAccessToken()
    const option = {
        httpOnly: true, //it is only modified at  server side AND  not modified by frantend side
        secure: true
    }
    res.status(201).cookie("token", token, option).json(new ApiResponse(201, token, "Successfully Login"))
});
const SearchUser = asyncHandler(async (req, res) => {
    try {
        const keyword = req.query.search
            ? {
                $or: [
                    { email: { $regex: req.query.search, $options: "i" } },
                    { name: { $regex: req.query.search, $options: "i" } },
                ],
            }
            : {};
        const Users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
        if (Users.length === 0) {
            return res.status(404).json(new ApiResponse(404, null, "No user found"));
        }
        return res
            .status(200)
            .json(new ApiResponse(200, Users, "Successfully Search User"));
    } catch (error) {
        return res.status(500).json(new ApiResponse(500, null, error.message));
    }
});

module.exports = {
    userRegister,
    login,
    SearchUser
}