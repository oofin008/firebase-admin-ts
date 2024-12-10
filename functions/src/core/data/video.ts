import { JSONSchemaType } from "ajv";

export interface GetSignedUploadUrlRequest {
  filePath: string;
  metadata: { [key: string]: any };
}

export const VideoUploadUrlRequestDto: JSONSchemaType<GetSignedUploadUrlRequest> = {
  type: "object",
  properties: {
    filePath: { type: "string" },
    metadata: { type: "object" },
  },
  required: ["filePath"],
  additionalProperties: false,
};