const request = (url, params = {}, method = 'GET') => {
    let options = {
        method
    };

    url += '?' + (new URLSearchParams(params)).toString();

    return fetch(url, options).then(response => response.json());
};



async function authUser(data) {
    const url = "/auth/login"
   return request(url,data,"POST")
}


export {
    authUser,

}