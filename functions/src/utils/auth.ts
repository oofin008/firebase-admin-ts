import { HttpsError } from "firebase-functions/v1/auth";
import { TaskContext } from "firebase-functions/v1/tasks";

type AuthLevel = "user" | "admin" | "moderator";

export function isAuth(context: TaskContext, authLevel: AuthLevel) {
  if (!context.auth) {
    throw new HttpsError(
      "unauthenticated",
      "The function must be called while authenticated"
    );
  }
  const { token } = context.auth;
  if (token.role !== authLevel) {
    throw new HttpsError(
      "permission-denied",
      "You need admin permission to call this function"
    );
  }
}