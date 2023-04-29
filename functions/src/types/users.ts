import { JSONSchemaType } from "ajv";
import { UserDocument } from "../core/data/users";

export interface IUser {
  email: string;
  role: Role;
}

export interface CreateUserRequest extends IUser {
  password: string;
}

export const ALL_ROLES = ["admin", "user", "moderator"];

type RoleTuple = typeof ALL_ROLES;

export type Role = RoleTuple[number];

export const CreateUserDto: JSONSchemaType<CreateUserRequest> = {
  type: "object",
  properties: {
    email: { type: "string" },
    role: { type: "string", format: "Role" },
    password: { type: "string" },
  },
  required: ["email", "password", "role"],
  additionalProperties: false,
};

export interface ListUsersRequest {
  limit: number;
  page: number;
}

export const ListUsersDto: JSONSchemaType<ListUsersRequest> = {
  type: "object",
  properties: {
    limit: { type: "integer" },
    page: { type: "integer" },
  },
  required: [],
};

export interface ListUsersResponse {
  response: UserDocument[];
  total: number;
}

export interface DeleteUserRequest {
  uid: string;
}

export const DeleteUserDto: JSONSchemaType<DeleteUserRequest> = {
  type: "object",
  properties: {
    uid: { type: "string" },
  },
  required: ["uid"],
}
