import { combineReducers } from "redux";
import { userReducer } from './userReducers.js';
import { InvoiceReducer } from './invoiceReducer';
import { profileReducer } from './profileReducer'

export const reducers = combineReducers({
    user: userReducer,
    invoices: InvoiceReducer,
    profile: profileReducer,
})