import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { TaskContext } from "firebase-functions/v1/tasks";
// import { UserRecord } from "firebase-functions/v1/auth";
import { useAuth } from "../utils/auth";
import { HttpsError } from "firebase-functions/v1/auth";
import { AdminService } from "../core/services/adminService";
import { ajv } from "../utils/validator";
import { Validator } from "../core/interfaces/validator";
import { ListUsersRequest } from "../types/users";

export const listUsers = functions.https.onCall(
  async (data: ListUsersRequest, context: TaskContext) => {
    try {
      const adminService = new AdminService(
        admin.auth(),
        admin.firestore(),
        ajv as Validator
      );
      await useAuth(context, "admin");

      let { limit = 10, page = 1 } = data;

      return await adminService.listUsers(limit, page);
    } catch (error: any) {
      if (error instanceof HttpsError) {
        throw error;
      }
      throw new HttpsError("internal", error.message);
    }
  }
);
