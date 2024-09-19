import type { UserRecord } from "firebase-functions/v1/auth";
import type { Role } from "@/types/users";
import type { UserDocument, ListUsersResponse } from "@/core/data/user";

export interface IAdminService {
  setRole(uid: string, role: Role): Promise<boolean>;
  getRole(uid: string): Promise<Role>;
  getPermission(): Promise<any>;
  setPermission(uid: string, permission: any): Promise<boolean>;
  
  createUser(email: string, password: string, role: Role): Promise<UserRecord>;
  listUsers(limit: number, page: number): Promise<ListUsersResponse>;
  getUser(uid: string): Promise<UserDocument>;
  updateUser(data:any): Promise<boolean>;
  deleteUser(uid: string): Promise<boolean>;
}
