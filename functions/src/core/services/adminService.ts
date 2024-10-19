import type { Auth } from "firebase-admin/auth";
import type { Firestore } from "firebase-admin/firestore";
import type { Role } from "@/types/users";
import type { IAdminService } from "@core/interfaces/adminService";
import { UserDocument } from "@core/data/user";

export default class AdminService implements IAdminService {
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

  public async getRole(uid: string): Promise<Role> {
    try {
      const user = await this.auth.getUser(uid);
      return user.customClaims?.role;
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
      console.time("listUsers");
      const totalQuery = await collectionRef.count().get();
      console.timeEnd("listUsers");
      
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
      console.log('listUsers response: ', JSON.stringify(response));
      return {
        response,
        total: totalQuery.data().count,
      };
    } catch (error) {
      throw error;
    }
  }

  public async getUser(uid: string): Promise<UserDocument> {
    try {
      const promise = await this.firestore.collection(this.USER_COLLECTION).doc(uid).get();
      const userData =  promise.data() as UserDocument;
      return userData;
    } catch (error) {
      throw error;
    }
  }

  public async updateUser(data: any): Promise<boolean> {
    return true;
  }

  public async deleteUser(uid: string): Promise<boolean> {
    try {
      await this.auth.deleteUser(uid);
      await this.firestore.collection(this.USER_COLLECTION).doc(uid).delete();
      return true;
    } catch (error) {
      throw error;
    }
  }
}
