import {
  AddExpenseResponse,
  ExpenseDocument,
  ListExpensesResponse,
} from '@core/data/expense';

export interface IExpenseService {
  addExpense(record: ExpenseDocument): Promise<AddExpenseResponse>;
  listExpenses(limit: number, page: number): Promise<ListExpensesResponse>;
}
