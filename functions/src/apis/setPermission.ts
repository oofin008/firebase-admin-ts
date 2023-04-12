import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { FirebaseError } from "firebase-admin";

export const setPermission: functions.HttpsFunction = functions.https.onRequest(async (req, res) => {
  try {
    const data = req.body;
    await admin.firestore().collection("tester").doc("duplicate-id").set(data, { merge: true });
    res.status(200).json({ message: 'success'});
  } catch(err) {
    const error = err as FirebaseError;
    res.status(500).json({ errorInfo: error.message });
  }
});
