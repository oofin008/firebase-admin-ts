"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuth = void 0;
const auth_1 = require("firebase-functions/v1/auth");
function isAuth(context, authLevel) {
    if (!context.auth) {
        throw new auth_1.HttpsError("unauthenticated", "The function must be called while authenticated");
    }
    const { token } = context.auth;
    if (token.role !== authLevel) {
        throw new auth_1.HttpsError("permission-denied", "You need admin permission to call this function");
    }
}
exports.isAuth = isAuth;
//# sourceMappingURL=auth.js.map