const { Router } = require("../index");
const { passport } = require("../passport/passportGoogle");


Router.get("/", (req, res) => {
    console.log("home -- "+ req.user);
    console.log("home -- "+ req.cookies);
    if(req.user)
    res.send("Welcome "+req.user.name);
    else
    res.send("This is Home Route, Please Login <a href='/login/google'>click here</a>");
})

Router.get("/login", (req, res)=> {
    if(req.user)
    res.send(req.user.name+" You are already loged-in, To Logout <a href='/logout'>click here</a>");
    res.redirect("/login/google");
})

Router.get("/error", (req, res) => {
    res.send("Error Occured");
})

Router.get("/login/google", passport.authenticate("google", { scope: ['profile', 'email']}));

Router.get('/login/google/callback', passport.authenticate('google', { failureRedirect: '/error' }), (req, res)=>{
    res.redirect("/login")
})

Router.get("/logout", (req, res) => {
    console.log("logout - "+req.user)
    req.logout();
    console.log("logout - "+req.user)
    res.send("Logout Sucess")
})
module.exports = Router;