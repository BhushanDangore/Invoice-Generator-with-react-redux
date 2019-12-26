const proxy = require('http-proxy-middleware')
console.log("text")
module.exports = function(app) {
    app.use(proxy('/api/', 
    { target: 'http://localhost:5000/' }
    ));
}