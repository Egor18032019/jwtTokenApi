import React from "react";
import { ReducerActionRouter } from "./CONST.js"

const DataContext = React.createContext("info");
const initialState = {
    error: false,
    username: "",
    result: [],
    status: ""
};


const dataReducer = (state, action) => {

    switch (action.type) {
 
        case ReducerActionRouter.INFO:
            const response = action.payload;

            return Object.assign(
                {}, state, {
                error: response.error,
                username: response.username,
                status: "LOGIN"
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