import type { Auth } from "firebase-admin/auth";
import type { Firestore } from "firebase-admin/firestore";
import type { Role } from "../../types/users";
import type { IAdminService } from "../interfaces/adminService";
import { UserDocument } from "../data/users";

export class AdminService implements IAdminService {
  constructor(auth: Auth, firestore: Firestore) {
    this.auth = auth;
    this.firestore = firestore;
  }

  private readonly auth: Auth;
  private readonly firestore: Firestore;
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

  public async createUser(email: string, password: string, role: Role) {
    try {
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

  public async deleteUser(uid: string): Promise<boolean> {
    try {
      return true;
    } catch (error) {
      throw error;
    }
  }
}
