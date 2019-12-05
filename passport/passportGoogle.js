const passport = require("passport");
const googleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("../keys/keys").google;
const users = require("../database/schemas");

passport.use(new googleStrategy({
    clientID: keys.ClientID,
    clientSecret: keys.ClientSecret,
    callbackURL: "/login/google/callback"
}, (accessToken, refreshToken, Profile, callback) => {

    users.findOne({
        "googleID": Profile.id
    }, (err, user) => {
        if (err) return console.log("Error in finding the user");
        if (user) {
            return callback(null, user);
        } else {
            let newUser = new users({
                googleID: Profile.id,
                name: Profile.displayName,
                email: Profile._json.email,
            })
            newUser.save((err, user) => {
                if (err) return console.log("Error occured during saving");
                return callback(null, user);
            })
        }
    })

}));

passport.serializeUser(function (user, done) {
    done(null, user.googleID); //  Will create cookie from user and send it on to the browser
});

passport.deserializeUser(function (id, done) {
    users.findOne({ "googleID" : id}, (err, user) => {
        if(err) return done(err, null);
        if(user){
            console.log("form dec function\n"+user)
            return done(null, user); // Will Create user from cookie
        }
    })
});

module.exports = {
    passport
}