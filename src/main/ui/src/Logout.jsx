import { logout } from "./Api.js"
import React, { useEffect } from 'react';
import {
    AppRoute
} from "./CONST.js"

function Logout() {

    useEffect(() => {
        logout()
        const loginUrl = AppRoute.AUTH; // url страницы для авторизации
        window.location.replace(loginUrl);
    }, [])
    return (
        <div className="main">
            
        </div>
    );
}

export default Logout;