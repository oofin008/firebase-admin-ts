import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { TaskContext } from "firebase-functions/v1/tasks";
import { HttpsError } from "firebase-functions/v1/auth";
import { AdminService } from "../core/services/adminService";
import { ajv } from "../utils/validator";
import { Validator } from "../core/interfaces/validator";

export const getPermission = functions.https.onCall(async (_data, context: TaskContext) => {
  try{
    const adminSdk = new AdminService(
      admin.auth(),
      admin.firestore(),
      ajv as Validator,
    )

    return await adminSdk.getPermission()
  } catch(error: any) {
    if(error instanceof HttpsError) {
      throw error;
    }
    throw new HttpsError("internal", error.message);
  }
})
