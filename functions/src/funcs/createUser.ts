import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import AdminService from "../core/services/adminService";
import { CreateUserRequest } from "../types/users";
import { TaskContext } from "firebase-functions/v1/tasks";
import { useAuth } from "../utils/auth";
import { HttpsError } from "firebase-functions/v1/auth";
import { SchemaType } from "../core/interfaces/validator";
import { Validator } from "../core/services/validator";

const isValidate = (data: CreateUserRequest) => {
  return Validator.validate(SchemaType.CREATE_USER, data);
}

export const createUser = functions.https.onCall(async (data: CreateUserRequest, context: TaskContext) => {
  try {
    // check if the user is authenticated
    await useAuth(context, "admin");

    if(!isValidate(data)) {
      throw new HttpsError("invalid-argument", Validator.errors);
    }

    const adminSdk = new AdminService(
      admin.auth(),
      admin.firestore(),
    );
    
    const { email, password, role } = data;
    return await adminSdk.createUser(email, password, role);

  } catch (error: any) {
    if (error instanceof HttpsError) {
      throw error;
    }
    throw new functions.https.HttpsError("internal", error.message);
  }
});