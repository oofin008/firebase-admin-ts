"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setAdminPermission = void 0;
const functions = require("firebase-functions");
const admin = require("firebase-admin");
exports.setAdminPermission = functions.https.onRequest(async (req, res) => {
    try {
        const authorization = req.headers.authorization;
        if (authorization !== "S@nti-1995") {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        const { uid } = req.body;
        if (!uid) {
            res.status(400).json({ message: "Bad Request, uid is required" });
            return;
        }
        const user = await admin.auth().getUser(uid);
        await admin.auth().setCustomUserClaims(user.uid, { role: 'admin' });
        res.status(200).json({ message: "Set admin permission success" });
    }
    catch (err) {
        const error = err;
        res.status(500).json({ errorInfo: error.message });
    }
});
//# sourceMappingURL=setAdminPermission.js.map