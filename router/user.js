const { Router } = require("../index");
const { userModel } = require("../database/schemas");

Router.get("/createinvoice", (req, res) => {
    if(req.user){
        let invoice = req.query;
        let itemsArray = [];
        let existingInvoices;
        invoice.items.forEach(item => {
            itemsArray.push(JSON.parse(item));
        })
        invoice.items = itemsArray;
        invoice.date = new Date();
        
        userModel.findById(req.user.id, (err, user) => {
            if(err) res.send({status: false}) 
            else{
                existingInvoices = user.invoices;
                userModel.findByIdAndUpdate(req.user.id, { invoices: [...existingInvoices, invoice] }, {new: true}, (err, res) => {
                    if(err) sendRes( {status: false} );
                    else sendRes( { status: true } )
                })
            }
        })
    }
    else res.send({status: false});
    
    function sendRes(params) {
        res.send(params);
    }
})

Router.get("/invoices", (req, res) => {
    if(req.user){
        userModel.findById(req.user.id, (err, user) => {
            if(err) res.send( { status: false } )
            if(user) {
                res.send( { invoices: user.invoices } );
            }
        } )
    }
    else res.send({status: false});
})

module.exports = Router;