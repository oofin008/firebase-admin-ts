import Ajv from "ajv";
import { SchemaType } from "../core/interfaces/validator";
import { ALL_ROLES, Role, CreateUserDto, ListUsersDto, DeleteUserDto } from "../types/users";

const ajv = new Ajv();

ajv.addSchema(CreateUserDto, SchemaType.CREATE_USER);
ajv.addSchema(ListUsersDto, SchemaType.LIST_USER);
ajv.addSchema(DeleteUserDto, SchemaType.DELETE_USER);
ajv.addFormat("Role", {
  type: "string",
  validate: (role: Role) => {
    return ALL_ROLES.includes(role);
  },
});

export { ajv };
