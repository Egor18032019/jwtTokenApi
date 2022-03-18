import {
    AppRoute,
    BACKEND
} from "./CONST.js"

const request = async (url, params = {}, method = 'GET') => {
    let options = {
        method
    };

    url += '?' + (new URLSearchParams(params)).toString();

    const response = await fetch(url, options);
    return await response.json();
};

async function fetchIsAuth() {
    const url = BACKEND.USER;
    console.log(" fetchIsAuth " + url)
    const loginUrl = AppRoute.AUTH; // url страницы для авторизации
    let tokenData = null; // объявляем локальную переменную tokenData
    console.log(sessionStorage.getItem("tokenData"))
    if (sessionStorage.tokenData) { // если в sessionStorage присутствует tokenData, то берем её
        tokenData = JSON.parse(sessionStorage.tokenData);
    } else {
        console.log("no have token")
        return window.location.replace(loginUrl); // если токен отсутствует, то перенаправляем пользователя на страницу авторизации
    }
    const options = {
        headers: {
            Authorization: `Bearer ${tokenData}`
        } // добавляем токен в headers запроса
    }
    const response = await fetch(url, options); // возвращаем изначальную функцию, но уже с валидным токеном в headers
    return await response.json()
}

async function login(data) {
    const url = BACKEND.LOGIN;
    return await request(url, data, "POST")
}

async function logout(data) {
    const url = BACKEND.LOGOUT;
    // нужен ли токен при логауте ?
    let tokenData = null;
    console.log(sessionStorage.getItem("tokenData"))
    if (sessionStorage.tokenData) {
        tokenData = JSON.parse(sessionStorage.tokenData);
        sessionStorage.removeItem("tokenData");
    }
    const options = {
        headers: {
            Authorization: `Bearer ${tokenData}`
        }
    }
    return await request(url, options, data, "POST")
}

async function authUser(dataRequest) {
    let userData = login(dataRequest).then(
        (data) => {
            console.log(data)

            let isRequestHaveError = data.error;
            console.log(isRequestHaveError)
            if (isRequestHaveError) {
                console.error(data.message)
                //TODO показ ошибки пользователю
            } else {
                const url = AppRoute.ROOT;
                console.log(data.token)
                const token = data.token;
                sessionStorage.setItem('tokenData', JSON.stringify(token));
                //TODO + подумать о том что бы хранить не только токен а плюс еще время создания токена ?
                window.location.replace(url)
            }
            return data;
        }
    )
    console.log(userData)
    return userData;
}

export {
    authUser,
    fetchIsAuth,
    logout
}