const {
    Router
} = require("../index");

Router.get("/", (req, res) => {
    res.send("this is from router");
})

Router.get("/login", (req, res) => {
    res.send("Sample")
})
module.exports = Router;