import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { HttpsError } from "firebase-functions/v1/auth";
import AdminService from "../core/services/adminService";
import { CallableContext } from "firebase-functions/v1/https";

export const getPermission = functions.https.onCall(
  async (_data, context: CallableContext) => {
    try {
      const adminService = new AdminService(admin.auth(), admin.firestore());

      return await adminService.getPermission();
    } catch (error: any) {
      if (error instanceof HttpsError) {
        throw error;
      }
      throw new HttpsError("internal", error.message);
    }
  }
);
