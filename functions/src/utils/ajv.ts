import Ajv from "ajv";
import { SchemaType } from "@core/interfaces/validator";
import { CreateUserDto, ListUsersDto, DeleteUserDto } from "@core/data/user";
import { ALL_ROLES, Role } from "@/types/users";
import { AddExpenseDto, ListExpensesDto } from "@/core/data/expense";

const ajv = new Ajv();

ajv.addSchema(CreateUserDto, SchemaType.CREATE_USER);
ajv.addSchema(ListUsersDto, SchemaType.LIST_USER);
ajv.addSchema(DeleteUserDto, SchemaType.DELETE_USER);
ajv.addSchema(AddExpenseDto, SchemaType.ADD_EXPENSE);
ajv.addSchema(ListExpensesDto, SchemaType.LIST_EXPENSE);
ajv.addFormat("Role", {
  type: "string",
  validate: (role: Role) => {
    return ALL_ROLES.includes(role);
  },
});

export { ajv };
