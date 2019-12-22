const { passport } = require("./passport");
const users = require("../database/schemas");


passport.serializeUser(function (user, done) {
    if (user.googleID)
        done(null, user.googleID); //  Will create cookie from user and send it on to the browser
    else if (user.facebookID)
        done(null, user.facebookID);
    else
        console.log("Error in serilization");
});

passport.deserializeUser(function (id, done) {
    users.findOne({
        $or:[{"facebookID" : id}, {"googleID" : id}]
    }, (err, user) => {
        if (err) return done(err, null);
        if (user) {
            return done(null, user); // Will Create user from cookie
        }
    })
});

module.exports = {
    passport
}