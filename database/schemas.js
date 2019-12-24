const {mongoose} = require("./mongoose");
const Schema = mongoose.Schema;

const item = new Schema({
    itemName: String,
    quantity: Number,
    cost: Number
})

const invoice = new Schema({
    nameOfCustomer: String,
    date: Date,
    items: [ item ]
})

const user = new Schema({
    googleID: Number,
    facebookID: Number,
    profilePic: String,
    name: String,
    email: String,
    invoices: [ invoice ]
})

const userModel = mongoose.model("users", user);

module.exports = userModel;