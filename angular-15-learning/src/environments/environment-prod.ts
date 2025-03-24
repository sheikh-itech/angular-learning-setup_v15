
const apiBase = "http://localhost:8081/";
const apiPublic = "http://localhost:8081/public/";

export const environment = {

    production: true,

    authenticate: apiBase + "user/authenticate",
    authorize: apiBase + "auth/authorize",



    //Public Urls
    register: apiPublic + "user/add",
    userDetail: apiPublic + "user/list",
}