import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import { TaskContext } from "firebase-functions/v1/tasks";
import { HttpsError } from "firebase-functions/v1/auth";
import { useAuth } from "../utils/auth";
import { AdminService } from "../core/services/adminService";
import { ajv } from "../utils/validator";
import { Validator } from "../core/interfaces/validator";
import { DeleteUserRequest } from "../types/users";

export const deleteUser = functions.https.onCall(
  async (data: DeleteUserRequest, context: TaskContext) => {
    try {
      const adminSdk = new AdminService(
        admin.auth(),
        admin.firestore(),
        ajv as Validator,
      );

      await useAuth(context, "admin");
      return await adminSdk.deleteUser(data);

    } catch (error: any) {
      if (error instanceof HttpsError) {
        throw error;
      }
      throw new HttpsError("internal", error.message);
    }
  }
);
