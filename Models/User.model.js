
const mongoose = require("mongoose")

const UserSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    dob: { type: Date, required: true },
    bio: { type: String, required: true },
    posts: [{ type: Object, required: true }],
    friends: [{ type: Object, required: true }],
    friendRequests: [{ type: Object, required: true }]
}, {
    versionKey: false
})

const UserModel = mongoose.model("User", UserSchema)

module.exports = {
    UserModel
}