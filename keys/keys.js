if(process.env.NODE_ENV == 'production'){
    console.log("lavda");
    
    const keys = {
        google: {
            ClientID: process.env.ClientID,
            ClientSecret: process.env.ClientSecret
        },
        mongoURI: process.env.mongoURI,
    }
    module.exports = keys
}
else{
    module.exports = require('./dev-keys'); //All the devlopement keys can be kept in dev-keys file
}