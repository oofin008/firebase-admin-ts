import { JSONSchemaType } from 'ajv';

export interface ExpenseDocument {
  id: string;
  title: string;
  amount: number;
  category: string;
  date: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface AddExpenseRequest extends ExpenseDocument {}

export const AddExpenseDto: JSONSchemaType<AddExpenseRequest> = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    title: { type: 'string' },
    amount: { type: 'number' },
    category: { type: 'string' },
    date: { type: 'string' },
    description: { type: 'string' },
    createdAt: { type: 'string' },
    updatedAt: { type: 'string' },
  },
  required: ['amount', 'date', 'title'],
  additionalProperties: false,
};

export interface AddExpenseResponse {
  id: string;
}

export interface ListExpensesRequest {
  limit: number;
  page: number;
}

export const ListExpensesDto: JSONSchemaType<ListExpensesRequest> = {
  type: 'object',
  properties: {
    limit: { type: 'integer' },
    page: { type: 'integer' },
  },
  required: [],
};

export interface ListExpensesResponse {
  response: ExpenseDocument[];
  total: number;
}
