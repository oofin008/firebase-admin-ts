import * as admin from "firebase-admin";
import { setAdminPermission } from "./apis";
import { createUser, listUsers, getPermission } from "./funcs";
var serviceAcc = require("../../santi-signin-service-account.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAcc),
});

// function name is importent
// as it used as API path and callable function Name
// To call callable function (onCall), via Postman
// use POST method, along with body type raw: JSON
// with "data": {} field

export {
  // apis
  setAdminPermission,

  // funcs
  createUser,
  listUsers,
  getPermission,
};
