import React from "react";
import { ReducerActionRouter, Active } from "./CONST.js"

const DataContext = React.createContext("cells");
const initialState = {
    auth: Active.FALSE,
    result: [],
    status: ""
};


const dataReducer = (state, action) => {

    switch (action.type) {
        case ReducerActionRouter.LOGIN:
            const responseLogin = action.payload;

            return Object.assign(
                {}, state, {
                result: responseLogin,
                status: "LOGIN"
            })
            case ReducerActionRouter.INFO:
                const response = action.payload;
    
                return Object.assign(
                    {}, state, {
                    result: response,
                    status: "INFO"
                })
        default:
            return Object.assign(
                {}, state, {
                result: [],
                status: ""
            })
    }
}


export {
    dataReducer,
    initialState,
    DataContext
};