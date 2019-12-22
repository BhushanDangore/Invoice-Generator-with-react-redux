import { combineReducers } from "redux";
import { userReducer } from './userReducers.js';

export const reducers = combineReducers({
    user: userReducer,
})