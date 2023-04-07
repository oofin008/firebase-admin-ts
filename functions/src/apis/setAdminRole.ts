import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { FirebaseError } from "firebase-admin";

export const setAdminRole:functions.HttpsFunction  = functions.https.onRequest(async (req, res) => {
  try{
    const authorization = req.headers.authorization;
    if (authorization !== "S@nti-1995") {
      res.status(401).json({ message: "Unauthorized"});
      return;
    }
    const { uid } = req.body;
    if (!uid) {
      res.status(400).json({ message: "Bad Request, uid is required"});
      return;
    }

    const user = await admin.auth().getUser(uid);

    await admin.auth().setCustomUserClaims(user.uid, { role: 'admin'});
    res.status(200).json({message: "Set admin permission success"});
  }catch(err){
    const error = err as FirebaseError;
    res.status(500).json({ errorInfo: error.message});
  }
});
