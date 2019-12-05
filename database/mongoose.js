const mongoose = require("mongoose");
let mongoKeylocal = require("../keys/keys").mongo;

mongoKey = process.env.mongoKey || mongoKeylocal;

mongoose.connect(mongoKey, {useNewUrlParser: true, useUnifiedTopology: true} , err => {
    err ? console.log("Error in connection to database" + err) : console.log("Connected to database")
});

module.exports = {
    mongoose
}