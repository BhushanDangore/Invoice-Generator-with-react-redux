const express = require('express');
const cookieParser = require("cookie-parser");
const { passport } = require("./passport/serializeDeserialize");
const Router = express.Router();

module.exports = { Router };

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cookieParser())
app.use(require('express-session')({
    cookie : {
    maxAge: 3600000, 
    secure: false
  },
    secret: 'akuiwdy786tyfgdcxdswe4r5tyuikjio9876',
    resave: false,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());


app.use("/api", require("./router/root"));
app.use("/api/profile", require("./router/profile"));


app.listen(PORT, () => console.log("Lisning on port"+ PORT));

module.exports = {
    passport,
}