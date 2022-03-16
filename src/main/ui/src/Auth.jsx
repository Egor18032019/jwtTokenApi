import React, { useState, useEffect, useRef, useContext } from 'react';
import { DataContext } from "./DataReducer"
import { ReducerActionRouter } from "./CONST.js"
import './Auth.css';
import { authUser } from "./Api.js"


function Auth() {
    const { state, dispatch } = useContext(DataContext);

    let formRef = useRef(null);
    let loginRef = useRef(null);
    let passwordRef = useRef(null);



    const Login = (evt) => {
        evt.preventDefault();
        console.log("SendCells ")
        const userRequest = {
            user_name: loginRef.current.value,
            password: passwordRef.current.value,
        }
        authUser(userRequest).then(
            (data) => {
                console.log("isRequestHaveError")
                console.log(data)
                let isRequestHaveError = data.error;
                console.log(isRequestHaveError)
                if (isRequestHaveError) {
                    console.error(data.message)
                }
                else {
                    console.log(data.token)
                    const token = data.token;
                    sessionStorage.setItem('tokenData', JSON.stringify(token));
                }

               

            }
        )
    }

    const _handleReset = () => {
        formRef = null
    }

    return (
        <div className="auth">
            <form className="auth-form" ref={formRef}>

                <fieldset className="auth-form__element">
                    <label className="auth-form__label" htmlFor="users"><span>Логин:</span> </label>
                    <input id="users" name="users" type="text" required ref={loginRef} />
                </fieldset>
                <fieldset className="auth-form__element">
                    <label className="auth-form__label" htmlFor="cells">Пароль: </label>
                    <input id="cells" name="cells" type="text" required ref={passwordRef} />
                </fieldset>

                <fieldset className="auth-form__element auth-form__element--submit">
                    <button className="ad-form__submit" type="submit" onClick={Login}>Отправить</button>
                    <span> или </span>
                    <button className="ad-form__reset" type="reset" onClick={_handleReset}>Очистить форму</button>
                </fieldset>
            </form>
        </div>
    );
}

export default Auth;