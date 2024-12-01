import { JSONSchemaType } from "ajv";

export interface GetSignedUploadUrlRequest {
  filePath: string;
}

export const VideoUploadUrlRequestDto: JSONSchemaType<GetSignedUploadUrlRequest> = {
  type: "object",
  properties: {
    filePath: { type: "string" },
  },
  required: ["filePath"],
  additionalProperties: false,
};