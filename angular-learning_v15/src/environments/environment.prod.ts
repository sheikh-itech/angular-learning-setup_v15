
const apiBase = "http://localhost:9091/v1/learning-service";

export const environment = {

  production: true,

  getUrl: apiBase + "/methods/http/get",
  postUrl: apiBase + "/methods/http/post",
  putUrl: apiBase + "/methods/http/put",
  patchUrl: apiBase + "/methods/http/patch",
  deleteUrl: apiBase + "/methods/http/delete",
  cities: apiBase + "/cities/all",
  cityById: apiBase + "/cities/city/",
  cityIds: apiBase + "/cities/city/ids",
  cityNameById: apiBase + "/cities/city/name/",

};
