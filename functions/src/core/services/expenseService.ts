import type { Firestore } from "@google-cloud/firestore";
import type { IExpenseService } from "@core/interfaces/expenseService";
import { AddExpenseResponse, ExpenseDocument, ListExpensesResponse } from "@core/data/expense";
import { DocumentData, Timestamp } from "firebase-admin/firestore";

export default class ExpenseService implements IExpenseService {
  constructor(firestore: Firestore) {
    this.firestore = firestore;
  }
  
  private readonly firestore: Firestore;
  private readonly EXPENSE_COLLECTION = "expenses";
  
  public async addExpense(record: ExpenseDocument): Promise<AddExpenseResponse> {
    try {
      const date = new Date(record.date);
      const result = await this.firestore.collection(this.EXPENSE_COLLECTION).add({
        ...record,
        date: Timestamp.fromDate(date),
      });
      return { id: result.id };
    } catch (error) {
      throw error;
    }
  }

  public async listExpenses(limit: number, page: number): Promise<ListExpensesResponse> {
    try {
      const offsetPage = (page - 1) * limit;
      const collectionRef = this.firestore.collection(this.EXPENSE_COLLECTION);
      console.time("listExpenses");
      const totalCount = await collectionRef.get().then((snapshot) => snapshot.size);
      console.timeEnd("listExpenses");

      const query = collectionRef.orderBy("date", "desc").limit(limit).offset(offsetPage);
      const querySnapshot = await query.get();
      const response: any[] = [];

      querySnapshot.forEach((doc) => {
        response.push(this.convertToExpenseDocument(doc));
      });
      return {
        response,
        total: totalCount,
      };
    } catch (error) {
      throw error;
    }
  }

  private convertToExpenseDocument(doc: FirebaseFirestore.QueryDocumentSnapshot<DocumentData, DocumentData>): ExpenseDocument {
    return {
      ...(doc.data() as ExpenseDocument),
      id: doc.id,
      date: doc.data().date.toDate().toISOString(),
      createdAt: doc.createTime.toDate().toISOString(),
      updatedAt: doc.updateTime.toDate().toISOString(),
    };
  }

}