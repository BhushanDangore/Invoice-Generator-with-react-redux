const {mongoose} = require("./mongoose");
const schema = mongoose.Schema;

const user = new schema({
    googleID: Number,
    name: String,
    email: String
})

const userModel = mongoose.model("users", user);

module.exports = userModel;