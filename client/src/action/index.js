import { GetUser, RemoveUser } from './types';
import axios from 'axios';

export const getUser = () => {
    return dispatch => {
        axios.get("/api/currentuser")
            .then(res => {
                dispatch({ type: GetUser, payload: res.data })}
            )
    }
}

export const removeUser = () => {
    return({
        type: RemoveUser,
    })
}