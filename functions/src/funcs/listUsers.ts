import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import AdminService from "@core/services/adminService";
import { useAuth } from "@/utils/auth";
import { HttpsError } from "firebase-functions/v1/auth";
import { SchemaType } from "@core/interfaces/validator";
import { ListUsersRequest } from "@core/data/user";
import { Validator } from "@core/services/validator";
import { CallableContext } from "firebase-functions/v1/https";

const isValidate = (data: ListUsersRequest) => {
  return Validator.validate(SchemaType.LIST_USER, data);
};

export const listUsers = functions.https.onCall(
  async (data: ListUsersRequest, context: CallableContext) => {
    try {
      const adminService = new AdminService(admin.auth(), admin.firestore());
      await useAuth(context, "admin");

      if (!isValidate) {
        throw new HttpsError("invalid-argument", Validator.errors);
      }

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
