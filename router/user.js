const { Router } = require("../index");
const { userModel } = require("../database/schemas");

Router.get("/createinvoice", (req, res) => {
    console.log(typeof req.query.date, req.query.date);
    console.log(Date.parse(req.query.date));
    if(req.user){
        let invoice = req.query;
        let itemsArray = [];
        let existingInvoices;
        invoice.items.forEach(item => {
            console.log(item);
            itemsArray.push(JSON.parse(item));
        })
        invoice.items = itemsArray;
        
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
    else res.send({status: false, msg: "You Are Not Loged In, Please Log-in First"});
    
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