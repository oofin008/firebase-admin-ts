import { HttpsError } from "firebase-functions/v1/auth";
import * as admin from "firebase-admin";
import { UserRecord } from "firebase-admin/auth";
import { CallableContext } from "firebase-functions/v1/https";

type AuthLevel = "user" | "admin" | "moderator" | "any";

export async function useAuth(context: CallableContext, authLevel: AuthLevel): Promise<UserRecord> {

  const uid = context.auth?.['uid'];
  if(!uid) {
    throw new HttpsError(
      "failed-precondition",
      "Request context is not correct"
    );
  }

  const user = await admin.auth().getUser(uid);

  if (!user) {
    throw new HttpsError(
      "unauthenticated",
      "The user is not exist"
    );
  }

  if (authLevel === "any") {
    return user;
  }

  const { customClaims } = user;

  if (!customClaims || !customClaims['role']) {
    throw new HttpsError(
      "unauthenticated",
      "No roles found"
    );
  }

  if (customClaims['role'] !== authLevel) {
    throw new HttpsError(
      "permission-denied",
      "You need admin permission to call this function"
    );
  }
  return user;
}