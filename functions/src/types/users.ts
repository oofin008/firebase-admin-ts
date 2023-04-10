import { JSONSchemaType } from "ajv";

export interface IUser {
  email: string;
  role: Role,
}

export interface CreateUserRequest extends IUser {
  password: string;
}

export const ALL_ROLES = [
  "admin",
  "user",
  "moderator",
];

type RoleTuple = typeof ALL_ROLES;
export type Role = RoleTuple[number];

export const CreateUserDto: JSONSchemaType<CreateUserRequest> = {
  type: "object",
  properties: {
    email: { type: "string" },
    role: { type: "string", format: "Role" },
    password: { type: "string" }
  },
  required: ["email", "password", "role"],
  additionalProperties: false
}

