import { CreateInvoice, ResetInvoiceSaveMsg, GetInvoices } from './../action/types';

export const InvoiceReducer = (state = { getInvoiceFailed: false, invoiceSaveStatus: false, invoiceList: []}, action) => {
    switch(action.type){
        case CreateInvoice:
            let invoiceSaveStatus;
            console.log("Payload ", action);
            if(action.payload.status){
                invoiceSaveStatus = `Invice of ${action.payload.invoice.nameOfCustomer} has been created sucessfully`;
            }
            else {
                invoiceSaveStatus = `Error occured during invoice creation of ${action.payload.invoice.nameOfCustomer}`;
            }
            return { ...state, invoiceSaveStatus};

        case ResetInvoiceSaveMsg:
            return { ...state, invoiceSaveStatus: false};
        
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