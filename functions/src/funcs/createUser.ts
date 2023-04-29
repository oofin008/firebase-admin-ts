import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { CreateUserRequest } from "../types/users";
import { TaskContext } from "firebase-functions/v1/tasks";
import { useAuth } from "../utils/auth";
import { HttpsError } from "firebase-functions/v1/auth";
import { ajv } from "../utils/validator";
import { AdminService } from "../core/services/adminService";
import { Validator } from "../core/interfaces/validator";

export const createUser = functions.https.onCall(async (data: CreateUserRequest, context: TaskContext) => {
  try {
    // check if the user is authenticated
    await useAuth(context, "admin");

    const adminSdk = new AdminService(
      admin.auth(),
      admin.firestore(),
      ajv as Validator,
    );

    return await adminSdk.createUser(data);

  } catch (error: any) {
    if (error instanceof HttpsError) {
      throw error;
    }
    throw new functions.https.HttpsError("internal", error.message);
  }
});