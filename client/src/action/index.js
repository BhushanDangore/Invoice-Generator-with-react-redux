import { GetUser, RemoveUser, CreateInvoice, ResetInvoiceSaveMsg, GetInvoices, GetProfileConfig, SetProfileConfig, ResetProfile } from './types';
import axios from 'axios';

export const getUser = () => {
    return dispatch => {
        axios.get("/api/currentuser")
            .then(res => { dispatch({ type: GetUser, payload: res.data }) })
    }
}

export const createInvoice = (Invoice) => {
    return dispatch => {
        let invoice = Invoice;
        axios.get("/api/user/createinvoice", {
            params: invoice
        }).then((res) => {
            let invoice = Invoice;
            if(res.data.status)
            dispatch({ type: CreateInvoice, payload: {status: true, invoice } })
            else
            dispatch({ type: CreateInvoice, payload: {status: false, invoice } })
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

export const getProfileConfig = () => {
    return dispatch => {
        axios.get("/api/user/profileconfig")
        .then(res => {
            dispatch({type: GetProfileConfig, payload: res.data})
        })
    }
}

export const setProfileConfig = (data) => {
    return dispatch => {
        axios.get("/api/user/setprofileconfig", { params: data })
        .then((res) => {
            dispatch({type: SetProfileConfig, payload: res.data})
        })
    }
}

export const resetProfile = () => {
    return {
        type: ResetProfile,
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