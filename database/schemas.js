const {mongoose} = require("./mongoose");
const Schema = mongoose.Schema;

// const inventory = new Schema({
//     item: {
//         name: String,
//         stock: Number,
//         unitCost: Number,
//         description: String,
//         purchasedOn: String,
//     }
// })

const invoice = new Schema({
    nameOfCustomer: String,
    costomerAddressLine: String,
    customerCity: String,
    customerState: String,
    customerCountry: String,
    date: String,
    items: [{
        item: String,
        quantity: Number,
        cost: Number,
        total: Number,
    }],
    invoiceTax: Number,
    invoiceRoundoff: Number,
    invoiceTotal: Number,
});

const user = new Schema({
    googleID: Number,
    facebookID: Number,
    profilePic: String,
    name: String,
    email: String,
    config: {
        shopName: String,
        addressLine1: String,
        addressLine2: String,
        currency: String,
    },
    invoices: [ invoice ],
});

const invoiceModel = mongoose.model("invoices", invoice);
const userModel = mongoose.model("users", user);

module.exports = {userModel, invoiceModel};
// module.exports = invoiceModel;