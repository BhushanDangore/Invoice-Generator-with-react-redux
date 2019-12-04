const express = require('express');
const Router = require("express").Router();

module.exports = {Router};

const app = express();

const PORT = process.env.PORT || 5000;

app.use("/profile", require("./router/profile"));
app.use("/", require("./router/root"));

app.listen(PORT, () => console.log("Lisning on port"+ PORT));