import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { useAuth } from "../utils/auth";
import { TaskContext } from "firebase-functions/v1/tasks";
import { HttpsError } from "firebase-functions/v1/auth";

export const getPermission = functions.https.onCall(async (_data, context: TaskContext) => {
  try{

    const user = await useAuth(context, "any");

    const collectionRef = admin.firestore().collection("users");
    const query = await collectionRef.doc(user.uid).get();
    const data = query.data();
  
    if (!data) {
      return {};
    }
    return {
      role: data.role,
      permission: data.permission,
    }
  } catch(error: any) {
    if(error instanceof HttpsError) {
      throw error;
    }
    throw new HttpsError("internal", error.message);
  }
})
