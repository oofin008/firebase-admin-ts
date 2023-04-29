import { HttpsError } from "firebase-functions/v1/auth";
import type { Auth } from "firebase-admin/auth";
import type { Firestore } from "firebase-admin/firestore";
import type { CreateUserRequest, DeleteUserRequest, Role } from "../../types/users";
import type { IAdminService } from "../interfaces/adminService";
import { SchemaType, Validator } from "../interfaces/validator";
import { UserDocument } from "../data/users";

export class AdminService implements IAdminService {
  constructor(auth: Auth, firestore: Firestore, validator: Validator) {
    this.auth = auth;
    this.firestore = firestore;
    this.validator = validator;
  }

  private readonly auth: Auth;
  private readonly firestore: Firestore;
  private readonly validator: Validator;
  private readonly USER_COLLECTION = "users";

  public async setRole(uid: string, role: Role): Promise<boolean> {
    try {
      await this.auth.setCustomUserClaims(uid, { role });
      await this.firestore
        .collection(this.USER_COLLECTION)
        .doc(uid)
        .set({ role }, { merge: true });
      return true;
    } catch (error) {
      throw error;
    }
  }

  public async getPermission(): Promise<any> {}

  public async setPermission(uid: string, permissions: any): Promise<boolean> {
    try {
      await this.firestore
        .collection(this.USER_COLLECTION)
        .doc(uid)
        .set({ permissions }, { merge: true });
      return true;
    } catch (error) {
      throw error;
    }
  }

  public async createUser(data: CreateUserRequest) {
    try {
      const isVerify = this.validator.validate(SchemaType.CREATE_USER, data);
      if (!isVerify) {
        console.log(this.validator.errors);
        throw new HttpsError("invalid-argument", this.validator.errors);
      }

      const { email, password, role } = data;
      const user = await this.auth.createUser({ email, password });
      await this.firestore.collection(this.USER_COLLECTION).doc(user.uid).set(
        {
          email: user.email,
          role,
        },
        { merge: true }
      );

      return user;
    } catch (error) {
      throw error;
    }
  }

  public async listUsers(limit: number, page: number): Promise<any> {
    try {
      if (!this.validator.validate(SchemaType.LIST_USER, { limit, page })) {
        throw new HttpsError("invalid-argument", this.validator.errors);
      }
      const offsetPage = page * limit - limit;
      const collectionRef = this.firestore.collection(this.USER_COLLECTION);
      const totalQuery = await collectionRef.count().get();
      const query = collectionRef
        .orderBy("email", "desc")
        .offset(offsetPage)
        .limit(limit);
      const querySnapshot = await query.get();
      const response: UserDocument[] = [];

      querySnapshot.forEach((doc) => {
        response.push({
          ...(doc.data() as UserDocument),
        });
      });
      return {
        response,
        total: totalQuery.data().count,
      };
    } catch (error) {
      throw error;
    }
  }

  public async getUser(uid: string): Promise<boolean> {
    try {
      return true;
    } catch (error) {
      return true;
    }
  }

  public async updateUser(data: any): Promise<boolean> {
    return true;
  }

  public async deleteUser(data: DeleteUserRequest): Promise<boolean> {
    try {
      if (!this.validator.validate(SchemaType.DELETE_USER, data)) {
        
      }
    } catch (error) {
      throw error;
    }
  }
}
