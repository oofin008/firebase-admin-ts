"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listUsers = exports.createUser = exports.setAdminPermission = void 0;
const admin = require("firebase-admin");
const apis_1 = require("./apis");
Object.defineProperty(exports, "setAdminPermission", { enumerable: true, get: function () { return apis_1.setAdminPermission; } });
const funcs_1 = require("./funcs");
Object.defineProperty(exports, "createUser", { enumerable: true, get: function () { return funcs_1.createUser; } });
Object.defineProperty(exports, "listUsers", { enumerable: true, get: function () { return funcs_1.listUsers; } });
var serviceAcc = require("../../santi-signin-service-account.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAcc),
});
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
//# sourceMappingURL=index.js.map