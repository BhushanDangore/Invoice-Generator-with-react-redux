import { CreateInvoice, ResetInvoiceSaveMsg, GetInvoices } from './../action/types';

export const InvoiceReducer = (state = { getInvoiceFailed: false, invoiceSaveFailed: false, invoiceList: []}, action) => {
    switch(action.type){
        case CreateInvoice:
            let invoiceSaveFailed;
            if(action.payload){
                invoiceSaveFailed = `Invice of ${action.payload.nameOfCustomer} has been created sucessfully`;
            }
            else {
                invoiceSaveFailed = `Error occured during invoice creation of ${action.payload.nameOfCustomer}`;
            }
            return { invoiceSaveFailed, invoiceList: []};

        case ResetInvoiceSaveMsg:
            return { ...state, invoiceSaveFailed: false};
        
        case GetInvoices:
            let getInvoiceFailed;
            if(action.payload.length > 0){
                console.log("GetInvoices Action Reducerd by Reducer ACTION:", action)
                return { getInvoiceFailed: false, invoiceSaveFailed: false, invoiceList: [...action.payload] }
            }
            else {
                getInvoiceFailed = "Failed to get your invoices";
                return { getInvoiceFailed, invoiceList: [], invoiceSaveFailed: false };
            }
        default:
            return state;
    }
}