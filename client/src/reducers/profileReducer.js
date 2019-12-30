import { GetProfileConfig, SetProfileConfig, ResetProfile, GetTaxes } from "../action/types";

export const profileReducer = (state = {taxes: null, getTaxesStatus: false}, action) => {
    switch(action.type){
        case GetProfileConfig:
            if(action.payload.status)
                return {...state, config: action.payload.config, statusMessage: false };
            else if(action.payload.status === null)
                return {...state, config: null, statusMessage: action.payload.msg, saveStatus: false};
            else
                return {...state, config: false, statusMessage: action.payload.msg, saveStatus: false };
            
        
        case SetProfileConfig:
            if(action.payload.status){
                return {...state, config: true, statusMessage: false, saveStatus: action.payload.msg};
            } else{
                return {...state, config: false, statusMessage: false, saveStatus: action.payload.msg};
            }
            
        case GetTaxes:
            if(action.payload.status){
                return { ...state, taxes: action.payload.taxes, getTaxesStatus: false }
            }
            return {...state, taxes: false, getTaxesStatus: action.payload.msg }
                
        case ResetProfile:
            return {...state, config: false, statusMessage: false, saveStatus: false };

        default: 
            return state;
    }
}