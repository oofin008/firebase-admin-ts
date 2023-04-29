import { ajv } from "../../utils/ajv";
import { IValidator, SchemaType } from "../interfaces/validator";

export class Validator extends IValidator {
  private static readonly ajv = ajv;

  public static validate(schemaName: SchemaType, data: any) {
    return Validator.ajv.validate(schemaName, data);
  }

  static get errors() {
    return Validator.ajv.errors?.toString() ?? '';
  };
}
