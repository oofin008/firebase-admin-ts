export abstract class IValidator {
  static validate: (schemaName: SchemaType, data: any) => boolean;
  static errors: any;
}

export enum SchemaType {
  CREATE_USER = "create_user",
  DELETE_USER = "delete_user",
  LIST_USER = "list_user",
  ADD_EXPENSE = "add_expense",
  LIST_EXPENSE = "list_expense",
};
