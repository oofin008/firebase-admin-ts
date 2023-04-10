import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { CreateUserRequest } from "../types/users";
import { TaskContext } from "firebase-functions/v1/tasks";
import { useAuth } from "../utils/auth";
import { HttpsError } from "firebase-functions/v1/auth";
import { ajv } from "../utils/validator";

export const createUser = functions.https.onCall(async (data: CreateUserRequest, context: TaskContext) => {
  try {
    // check if the user is authenticated
    await useAuth(context, "admin");
  
    if (!ajv.validate("create_user", data)) {
      throw new HttpsError("invalid-argument", "validate data error");
    }

    // get the user's email and password
    const { email,password, role } = data;

    // create a new user with email and password
    const user = await admin.auth().createUser({ email, password });
    // set the custom claims for the user's role
    await admin.auth().setCustomUserClaims(user.uid, { role });
    // add the user to the Firestore collection
    await admin.firestore().collection("users").doc(user.uid).set({ email: user.email, role });
    return user;
  } catch (error: any) {
    if (error instanceof HttpsError) {
      throw error;
    }
    throw new functions.https.HttpsError("internal", error.message);
  }
});