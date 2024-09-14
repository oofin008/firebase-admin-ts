import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import AdminService from "../core/services/adminService";
import { HttpsError } from "firebase-functions/v1/auth";
import { useAuth } from "../utils/auth";
import { DeleteUserRequest } from "../types/users";
import { Validator } from "../core/services/validator";
import { SchemaType } from "../core/interfaces/validator";
import { CallableContext } from "firebase-functions/v1/https";

const isValidate = (data: DeleteUserRequest) => {
  return Validator.validate(SchemaType.DELETE_USER, data);
};

export const deleteUser = functions.https.onCall(
  async (data: DeleteUserRequest, context: CallableContext) => {
    try {
      const adminService = new AdminService(admin.auth(), admin.firestore());

      await useAuth(context, "admin");

      if (!isValidate(data)) {
        throw new HttpsError("invalid-argument", Validator.errors);
      }

      const { uid } = data;
      return await adminService.deleteUser(uid);
    } catch (error: any) {
      if (error instanceof HttpsError) {
        throw error;
      }
      throw new HttpsError("internal", error.message);
    }
  }
);
