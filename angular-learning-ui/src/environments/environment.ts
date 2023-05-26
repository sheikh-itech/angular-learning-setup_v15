// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const apiBase = "http://localhost:9091/v1/learning-service";

export const environment = {

  production: false,

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
  redisDeleteAllUser: apiBase + "/redis/user/delete/all",
  qrCodeGenerate: apiBase + "/QR/generate",
  qrCodeDownload: apiBase + "/QR/download",
  qrDownloadAll: apiBase + "/QR/download/all"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
