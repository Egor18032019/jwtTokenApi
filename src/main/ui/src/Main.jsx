import Linkbar from "./Linkbar.jsx"
import React, { useEffect, useContext } from 'react';
import { logout, fetchIsAuth } from "./Api.js"
import { AppRoute } from "./CONST.js"
import { DataContext } from "./DataReducer"
import { ReducerActionRouter } from "./CONST.js"

function Main() {
    const { state, dispatch } = useContext(DataContext);

    useEffect(() => {
        fetchIsAuth()
            .then(
                data => {
                    if (data) {
                        dispatch({
                            type: ReducerActionRouter.INFO,
                            payload: data
                        })
                    }
                }
            )
    }, [dispatch]);

    const Logout = (evt) => {

        evt.preventDefault();

        logout().then(
            data => {
                window.location.replace(AppRoute.ROOT)
            }
        )
    }

    return (
        <div className="main">
            <div>
                <h2>{state.username ? "Авторизован пользователь: " + state.username : ""}</h2>
                <button onClick={Logout}> Выйти </button>
            </div>

            <Linkbar />

        </div>
    );
}

export default Main;