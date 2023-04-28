
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
  encCrypto: apiBase + "/decrypt/user",
  encAdvCrypto: apiBase + "/decrypt/user/custom",
  redisUserAdd: apiBase + "/redis/user/add",
  redisGetUsers: apiBase + "/redis/user/list",
  redisGetUser: apiBase + "/redis/user/list/",
  redisDeleteUser: apiBase + "/redis/user/delete/",
  redisDeleteAllUser: apiBase + "/redis/user/delete/all"
};
