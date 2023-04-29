export interface Validator {
  validate: (schemaName: SchemaType, data: any) => boolean;
  errors: any;
}

export enum SchemaType {
  CREATE_USER = "create_user",
  DELETE_USER = "delete_user",
  LIST_USER = "list_user",
};
