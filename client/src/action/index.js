import { GetUser, RemoveUser, CreateInvoice } from './types';
import axios from 'axios';

export const getUser = () => {
    return dispatch => {
        axios.get("/api/currentuser")
            .then(res => {
                dispatch({ type: GetUser, payload: res.data })}
            )
    }
}

export const createInvoice = (invoice) => {
    return {
        type: CreateInvoice,
        payload: invoice,
    }
}

export const removeUser = () => {
    return({
        type: RemoveUser,
    })
}