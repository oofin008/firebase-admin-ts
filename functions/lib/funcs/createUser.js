"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = void 0;
const functions = require("firebase-functions");
const admin = require("firebase-admin");
exports.createUser = functions.https.onCall(async (data, context) => {
    var _a, _b;
    console.log('====input data====');
    console.log('auth uid: ', (_a = context.auth) === null || _a === void 0 ? void 0 : _a.uid); // same
    console.log('token uid: ', (_b = context.auth) === null || _b === void 0 ? void 0 : _b.token.uid);
    // check if the user is authenticated
    if (!context.auth) {
        throw new functions.https.HttpsError("unauthenticated", "The function must be called while authenticated.");
    }
    const { token } = context.auth;
    if (token.role !== 'admin') {
        throw new functions.https.HttpsError("permission-denied", "You need admin permission to create user.");
    }
    // get the user's role
    const role = data.role;
    // check if the role is valid
    if (!["admin", "moderator", "user"].includes(role)) {
        throw new functions.https.HttpsError("invalid-argument", "The role is invalid.");
    }
    // get the user's email and password
    const email = data.email;
    const password = data.password;
    try {
        // create a new user with email and password
        const user = await admin.auth().createUser({ email, password });
        // set the custom claims for the user's role
        await admin.auth().setCustomUserClaims(user.uid, { role });
        // add the user to the Firestore collection
        await admin.firestore().collection("users").doc(user.uid).set({ email: user.email, role });
        return user;
    }
    catch (error) {
        throw new functions.https.HttpsError("internal", error.message);
    }
});
//# sourceMappingURL=createUser.js.map