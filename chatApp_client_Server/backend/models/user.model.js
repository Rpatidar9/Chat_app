const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const jsonwebtoken = require("jsonwebtoken")
const userSchema = mongoose.Schema({
    name: { type: String, required: false },
    email: { type: String, required: false },
    password: { type: String, required: false },
    pic: { type: String, required: false, default: "" },
}, { timestamp: true });
userSchema.methods.generateAccessToken = function () {
    return jsonwebtoken.sign({ _id: this._id, email: this.email }, "your_chat_app")
};
userSchema.methods.comparePassword = async function (enteredPassword, dbPassword) {
    return await bcrypt.compare(enteredPassword, dbPassword)
};
const User = mongoose.model("User", userSchema);
module.exports = User;