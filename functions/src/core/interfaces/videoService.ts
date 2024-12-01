export interface IVideoService {
  generateDownloadUrl(filePath: string): Promise<string>;
  generateSignedUploadUrl(filePath: string): Promise<string>;
}