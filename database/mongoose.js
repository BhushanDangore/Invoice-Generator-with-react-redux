const mongoose = require("mongoose");
const mongoURI = require("../keys/keys").mongoURI;

mongoose.connect(mongoURI, {useNewUrlParser: true, useUnifiedTopology: true} , err => {
    err ? console.log("Error in connection to database" + err) : console.log("Connected to database")
});

module.exports = {
    mongoose
}