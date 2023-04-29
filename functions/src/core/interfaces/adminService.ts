import type { UserRecord } from "firebase-functions/v1/auth";
import type { ListUsersResponse, Role } from "../../types/users";

export interface IAdminService {
  setRole(uid: string, role: Role): Promise<boolean>;
  getPermission(): Promise<any>;
  setPermission(uid: string, permission: any): Promise<boolean>;
  
  createUser(email: string, password: string, role: Role): Promise<UserRecord>;
  listUsers(limit: number, page: number): Promise<ListUsersResponse>;
  getUser(uid: string): Promise<boolean>;
  updateUser(data:any): Promise<boolean>;
  deleteUser(uid: string): Promise<boolean>;
}
