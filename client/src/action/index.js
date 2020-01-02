import { GetUser, RemoveUser, CreateInvoice, ResetInvoiceSaveMsg, GetInvoices, GetProfileConfig, SetProfileConfig, ResetProfile, GetTaxes, PrintInvoice } from './types';
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
            if(res.data.status){
                let taxes = res.data.config.taxes;
                let parsedTaxes = taxes.map(tax => {
                    return JSON.parse(tax);
                });
                res.data.config.taxes = parsedTaxes;
                return dispatch({type: GetProfileConfig, payload: res.data});
            }else dispatch({type: GetProfileConfig, payload: res.data});
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

export const getTaxes = () => {
    return dispatch => {
        axios.get("/api/user/gettaxes")
        .then(res => {
            if(res.data.status){
                let taxes = res.data.taxes;
                let parsedTaxes = taxes.map(tax => {
                    return JSON.parse(tax);
                });
                res.data.taxes = parsedTaxes;
                dispatch({ type: GetTaxes, payload: res.data });
            }else{
                dispatch({ type: GetTaxes, payload: res.data });
            }
        })
    }
}

export const printInvoice = (id) => {
    return dispatch => {
        axios.get('/api/user/printinvoice', {
            params: {Index: id},
        })
        .then(res => {
            dispatch({type: PrintInvoice, payload: res.data});
            window.open("data:application/pdf," + encodeURI(res.data));
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