import * as admin from "firebase-admin";
import { setAdminPermission } from "./apis";
import { createUser, listUsers } from "./funcs";
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
};


// export const updateUser = functions.https.onCall(async (data, context: TaskContext) => {
//   if (!context.auth) {
//     throw new functions.https.HttpsError(
//       "unauthenticated",
//       "The function must be called while authenticated."
//     );
//   }

//   const { token } = context.auth;
//   if (token.role !== 'admin') {
//     throw new functions.https.HttpsError(
//       "permission-denied",
//       "You need admin permission to create user."
//     )
//   }
//   context.auth.uid
//   token.uid
// });

