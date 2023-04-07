import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { CreateUserRequest } from "../types/users";
import { TaskContext } from "firebase-functions/v1/tasks";
import { useAuth } from "../utils/auth";
import { HttpsError } from "firebase-functions/v1/auth";

export const createUser = functions.https.onCall(async (data: CreateUserRequest, context: TaskContext) => {
  try {
    // check if the user is authenticated
    await useAuth(context, "admin");
  
    // get the user's role
    const role = data.role;
    
    // check if the role is valid
    if (!["admin", "moderator", "user"].includes(role)) {
      throw new functions.https.HttpsError(
        "invalid-argument",
        "The role is invalid."
      );
    }
    // get the user's email and password
    const email = data.email;
    const password = data.password;
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