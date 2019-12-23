import { combineReducers } from "redux";
import { userReducer } from './userReducers.js';
import { InvoiceReducer } from './invoiceReducer';

export const reducers = combineReducers({
    user: userReducer,
    invoices: InvoiceReducer,
})