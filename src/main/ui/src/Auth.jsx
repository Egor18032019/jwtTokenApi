import React, { useState, useRef } from 'react';
import './Auth.css';
import { authUser } from "./Api.js"


function Auth() {
    let [userData, setUserData] = useState({
        error: false,
        message: ""
    });
    console.log("Auth ! ")
    let formRef = useRef(null);
    let loginRef = useRef(null);
    let passwordRef = useRef(null);



    const Login = (evt) => {
        evt.preventDefault();
        const userRequest = {
            user_name: loginRef.current.value,
            password: passwordRef.current.value,
        }
        authUser(userRequest).then(
            data => {
                console.log(data)
                setUserData(data);
            }
        );
    }

    const _handleReset = () => {
        formRef = null
    }

    return (
        <div className="auth">
            <h2>{userData.error ? userData.message : ""}</h2>
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