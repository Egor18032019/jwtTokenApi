import { AppRoute } from "./CONST.js"
import { Link } from "react-router-dom";
import React, { useContext } from 'react';
import { DataContext } from "./DataReducer"

function Linkbar() {
    const { state } = useContext(DataContext);

    return (
        <div className="linkbar">
            {state.error || !state.username ?
               <Link className="linkbar " to={AppRoute.AUTH}>
               <h2>- Авторизация </h2>
           </Link>
           :"" }
                     <Link className="linkbar " to={AppRoute.INFO}>
                <h2>- Информация</h2>
            </Link>
            <Link className={"linkbar "} to={AppRoute.LOGOUT}>
                <h2>- Выйти </h2>
            </Link>
        </div>
    );
}

export default Linkbar;