const express = require('express');
const Router = require("express").Router();
const cookieParser = require("cookie-parser");
require("./database/mongoose");
const {passport} = require("./passport/passportGoogle");


module.exports = {Router};

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cookieParser())

app.use(require('express-session')({
    cookie : {
    maxAge: 3600000, // see below
    secure: false
  },
    secret: 'khugugjh',
    resave: false,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use("/profile", require("./router/profile"));
app.use("/", require("./router/root"));

app.listen(PORT, () => console.log("Lisning on port"+ PORT));