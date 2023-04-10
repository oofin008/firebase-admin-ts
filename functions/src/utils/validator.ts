import Ajv from "ajv";
import { ALL_ROLES, Role, CreateUserDto } from "../types/users";

const ajv = new Ajv();

ajv.addSchema(CreateUserDto, "create_user");
ajv.addFormat("Role", {
  type: "string",
  validate: (role: Role) => {
    return ALL_ROLES.includes(role);
  }
});

export {
  ajv
}
