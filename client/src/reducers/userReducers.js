import { GetUser, RemoveUser } from '../action/types'

export const userReducer = function(state = {name: null}, action ){
    switch(action.type){
        case GetUser:
            return {name: action.payload.name};
        case RemoveUser:
            return { name: false };
        default:
            return state;
    }
}