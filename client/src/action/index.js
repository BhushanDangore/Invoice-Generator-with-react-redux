import { GetUser, RemoveUser, CreateInvoice, ResetInvoiceSaveMsg, GetInvoices } from './types';
import axios from 'axios';

export const getUser = () => {
    return dispatch => {
        axios.get("/api/currentuser")
            .then(res => { dispatch({ type: GetUser, payload: res.data }) })
    }
}

export const createInvoice = (invoice) => {
    return dispatch => {
        axios.get("/api/user/createinvoice", {
            params: invoice
        }).then((res) => {
            if(res.data.status)
            dispatch({ type: CreateInvoice, payload: invoice })
            else
            dispatch({ type: CreateInvoice, payload: false })
        })
    }
}

export const getInvoices = () => {
    console.log("GetInvoices Action dispatched")
    return dispatch => {
        axios.get("/api/user/invoices")
        .then((res => {
            if(res.data.invoices){
                dispatch({ type: GetInvoices, payload: res.data.invoices });
            }
            else{
                dispatch({type: GetInvoices, payload: res.data });
            }
        }))
    }
}

export const resetInvoiceCreateMsg = () => {
    return {
        type: ResetInvoiceSaveMsg
    }
}

export const removeUser = () => {
    return({
        type: RemoveUser,
    })
}