const {  Router } = require("../index");
const { passport } = require("../passport/serializeDeserialize");

Router.get("/currentuser", (req, res) => {
    if(req.user){  
        res.send({ name: req.user.name });
    }
    else
        res.send({ name: false});
})

Router.get("/login/google", passport.authenticate("google", {scope: ["https://www.googleapis.com/auth/userinfo.email", "https://www.googleapis.com/auth/userinfo.profile"], accessType: 'offline', passReqToCallback: true}));

Router.get('/login/google/callback', passport.authenticate('google', { failureRedirect: '/login', successRedirect: '/dashboard' }))

Router.get("/login/facebook", passport.authenticate("facebook"))

Router.get("/login/facebook/callback", passport.authenticate("facebook", { failureRedirect: '/login', successRedirect: '/dashboard' }))

Router.get("/logout", (req, res) => {
    req.logout();
    res.redirect('/login');
})

module.exports = Router;
