export interface IUser {
  email: string;
  role: Role,
}

export interface CreateUserRequest extends IUser {
  password: string;
}

export type Role = "admin" | "user" | "moderator";

