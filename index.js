const express = require('express');
const cookieParser = require("cookie-parser");
const { passport } = require("./passport/serializeDeserialize");
const path = require('path');

const Router = express.Router();

module.exports = { Router };

const app = express();

app.use(express.static('client/build'));

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
app.use("/api/user", require("./router/user"));
app.use("/", (req, res) => {
    res.sendFile(path.join(__dirname, './client/build/', 'index.html'));
})

app.listen(PORT, () => console.log("Lisning on port"+ PORT));

module.exports = {
    passport,
}


