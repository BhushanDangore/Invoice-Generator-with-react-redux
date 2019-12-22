const {mongoose} = require("./mongoose");
const schema = mongoose.Schema;

const user = new schema({
    googleID: Number,
    facebookID: Number,
    profilePic: String,
    name: String,
    email: String
})

const userModel = mongoose.model("users", user);

module.exports = userModel;