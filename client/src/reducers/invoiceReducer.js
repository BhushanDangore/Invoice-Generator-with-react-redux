import { CreateInvoice } from './../action/types';

export const InvoiceReducer = (state = [], action) => {
    switch(action.type){
        case CreateInvoice:
            console.log(action.payload);
            return [...state, action.payload];
        default:
            return state;
    }
}