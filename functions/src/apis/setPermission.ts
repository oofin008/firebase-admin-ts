import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import AdminService from "@core/services/adminService";
import { FirebaseError } from "firebase-admin";

export const setPermission: functions.HttpsFunction = functions.https.onRequest(async (req, res) => {
  try {
    const adminSdk = new AdminService(
      admin.auth(),
      admin.firestore(),
    );
    const { uid, permissions } = req.body;

    await adminSdk.setPermission(uid, permissions);

    res.status(200).json({ message: 'success'});
  } catch(err) {
    const error = err as FirebaseError;
    res.status(500).json({ errorInfo: error.message });
  }
});
