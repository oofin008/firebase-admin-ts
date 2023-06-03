import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { TaskContext } from "firebase-functions/v1/tasks";
import { HttpsError } from "firebase-functions/v1/auth";
import AdminService from "../core/services/adminService";

export const getPermission = functions.https.onCall(
  async (_data, context: TaskContext) => {
    try {
      const adminSdk = new AdminService(admin.auth(), admin.firestore());

      return await adminSdk.getPermission();
    } catch (error: any) {
      if (error instanceof HttpsError) {
        throw error;
      }
      throw new HttpsError("internal", error.message);
    }
  }
);
