import { GetUser, RemoveUser } from '../action/types'

export const userReducer = function(state = null, action ){
    switch(action.type){
        case GetUser:
            return action.payload.user;
        case RemoveUser:
            return false;
        default:
            return null;
    }
}