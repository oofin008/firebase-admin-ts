import { HttpsError } from "firebase-functions/v1/auth";
import * as admin from "firebase-admin";
import { UserRecord } from "firebase-admin/auth";
import { CallableContext } from "firebase-functions/v1/https";

type AuthLevel = "user" | "admin" | "moderator" | "any";

interface IAuthLevelMap {
  [key: string]: AuthLevel[];
}

const AuthLevelMap: IAuthLevelMap = {
  admin: ["admin", "moderator", "user"],
  moderator: ["moderator", "user"],
  user: ["user"],
};

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

  if (!AuthLevelMap[customClaims['role']].includes(authLevel)) {
    throw new HttpsError(
      "permission-denied",
      "You don't have permission to call this function"
    );
  }

  return user;
}