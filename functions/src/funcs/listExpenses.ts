import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import ExpenseService from '@/core/services/expenseService';
import { ListExpensesRequest } from '@/core/data/expense';
import { useAuth } from '@/utils/auth';
import { HttpsError } from 'firebase-functions/v1/auth';
import { SchemaType } from '@/core/interfaces/validator';
import { Validator } from '@/core/services/validator';
import { CallableContext } from 'firebase-functions/v1/https';

const isValidate = (data: ListExpensesRequest) => {
  return Validator.validate(SchemaType.LIST_EXPENSE, data);
}

export const listExpenses = functions.https.onCall(async (data: ListExpensesRequest, context: CallableContext) => {
  try {
    // check if the user is authenticated
    await useAuth(context, 'user');
    
    if (!isValidate(data)) {
      throw new HttpsError('invalid-argument', Validator.errors);
    }
    const expenseService = new ExpenseService(
      admin.firestore(),
    );
    
    let { limit = 10, page = 1 } = data;

    return await expenseService.listExpenses(limit, page);

  } catch (error: any) {
    if (error instanceof HttpsError) {
      throw error;
    }
    throw new functions.https.HttpsError('internal', error.message);
  }
});
