export interface IVideoService {
  generateDownloadUrl(filePath: string): Promise<string>;
  generateSignedUploadUrl(filePath: string, metadata: { [key: string]:any }): Promise<string>;
}