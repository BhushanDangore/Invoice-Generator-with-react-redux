const proxy = require('http-proxy-middleware')
console.log("text")
module.exports = function(app) {
    app.use(proxy('/api/', 
    { target: 'http://localhost:5000/' }
    ));
    // app.use(proxy('/api/login/google/callback/*', 
    // { target: 'http://localhost:5000/' }
    // ));
    // app.get("/api/login/google/callback", (req, res, next) => {
    //     console.log("Executed\n")
    //     console.log(req)
    //     console.log(res)
    //     req.redirect('http://localhost:5000/')
    //     next();
}