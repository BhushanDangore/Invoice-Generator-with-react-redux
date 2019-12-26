import { GetUser } from '../action/types'

export const userReducer = function(state = { name: null }, action ){
    switch(action.type){
        case GetUser:
            return { name: action.payload.name };
        default:
            return state;
    }
}