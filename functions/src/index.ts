import * as admin from "firebase-admin";
import { setAdminRole, setPermission } from "./apis";
import { createUser, listUsers, getPermission, deleteUser, addExpense, listExpenses } from "./funcs";
var serviceAcc = require("./santi-signin-service-account.json");

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
  setAdminRole,
  setPermission,

  // funcs
  createUser,
  deleteUser,
  listUsers,
  getPermission,
  addExpense,
  listExpenses,
};
