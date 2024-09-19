import { JSONSchemaType } from "ajv";

export interface UserDocument {
  email: string | undefined;
  role: string | undefined;
  permission: string | undefined;
}

export interface IUser {
  email: string;
  role: string;
}

export interface CreateUserRequest extends IUser {
  password: string;
}

export const CreateUserDto: JSONSchemaType<CreateUserRequest> = {
  type: "object",
  properties: {
    email: { type: "string" },
    role: { type: "string" },
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