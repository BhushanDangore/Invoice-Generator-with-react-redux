const {mongoose} = require("./mongoose");
const Schema = mongoose.Schema;

const invoice = new Schema({
    nameOfCustomer: String,
    date: Date,
    items: [{
        itemName: String,
        quantity: Number,
        cost: Number,
        total: Number,
    }],
    invoiceTotal: Number,
    invoiceTax: Number,
    invoiceRoundoff: Number
});

const user = new Schema({
    googleID: Number,
    facebookID: Number,
    profilePic: String,
    name: String,
    email: String,
    invoices: [ invoice ]
});

const invoiceModel = mongoose.model("invoices", invoice);
const userModel = mongoose.model("users", user);

module.exports = {userModel, invoiceModel};
// module.exports = invoiceModel;