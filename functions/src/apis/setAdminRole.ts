import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import AdminService from "../core/services/adminService";
import type { FirebaseError } from "firebase-admin";


export const setAdminRole:functions.HttpsFunction  = functions.https.onRequest(async (req, res) => {
  try{
    // need to init here, if init outside cloud functions will get firebase error
    const adminService = new AdminService(
      admin.auth(), 
      admin.firestore(),
    );
    const authorization = req.headers.authorization;
    if (authorization !== "S@nti-1995") {
      res.status(401).json({ message: "Unauthorized"});
      return;
    }
    if (!req.body) {
      res.status(400).json({ message: "Bad Request"});
      return;
    }
    const { uid } = req.body;
    if (!uid) {
      res.status(400).json({ message: "Bad Request, uid is required"});
      return;
    }
    await adminService.setRole(uid, "admin");

    res.status(200).json({message: "Set admin permission success"});
  }catch(err){
    const error = err as FirebaseError;
    console.log('setAdminRole error: ', err);
    res.status(500).json({ errorInfo: error.message});
  }
});
