import type { UserRecord } from "firebase-functions/v1/auth";
import type { CreateUserRequest, DeleteUserRequest, ListUsersResponse, Role } from "../../types/users";

export interface IAdminService {
  setRole(uid: string, role: Role): Promise<boolean>;
  getPermission(): Promise<any>;
  setPermission(uid: string, permission: any): Promise<boolean>;
  
  createUser(data: CreateUserRequest): Promise<UserRecord>;
  listUsers(limit: number, page: number): Promise<ListUsersResponse>;
  getUser(uid: string): Promise<boolean>;
  updateUser(data:any): Promise<boolean>;
  deleteUser(data: DeleteUserRequest): Promise<boolean>;
}
