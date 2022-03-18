const AppRoute = {
    ROOT: `/`,
    AUTH: `/login`,
    INFO: `/info`,
    LOGOUT: `/logout`,
    USER: `/user`,
};


const ReducerActionRouter = {
    LOGIN: `LOGIN`,
    INFO: `INFO`,
}

const BACKEND = {
    LOGIN: "/auth/login",
    LOGOUT: "/auth/logout",
    USER: "/user"
}

export {
    AppRoute,
    ReducerActionRouter,
    BACKEND
};