const {Router} = require("../index");

Router.get("/profile", (req, res) => {
    res.send("this is from Profile");
})

module.exports = Router;