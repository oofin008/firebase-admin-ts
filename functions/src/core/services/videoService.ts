import type { Auth } from "firebase-admin/auth";
import type { Firestore } from "firebase-admin/firestore";
import type { Storage } from "firebase-admin/storage";
import { IVideoService } from "../interfaces/videoService";

export default class VideoService implements IVideoService {
  constructor(auth: Auth, firestore: Firestore, storage: Storage) {
    this._auth = auth;
    this._firestore = firestore;
    this._storage = storage;
  }

  //@ts-ignore: Unreachable code error
  private readonly _auth: Auth;
  //@ts-ignore: Unreachable code error
  private readonly _firestore: Firestore;
  private readonly _storage: Storage;

  public async generateSignedUploadUrl(filePath: string): Promise<string> {
    const bucket = this._storage.bucket();
    const file = bucket.file(filePath);
  
    const [resumableUploadUrl] = await file.createResumableUpload({
      metadata: {
        contentType: "video/mp4", // recieve from input to ensure correct file format
        cacheControl: "public, max-age=31536000", // Optional: Cache control for uploaded video
      },
    });
  
    return resumableUploadUrl;
  }

  public async generateDownloadUrl(filePath: string): Promise<string> {
    const bucket = this._storage.bucket();
    const file = bucket.file(filePath);
  
    // Generate a signed URL for download
    const [url] = await file.getSignedUrl({
      version: "v4",
      action: "read", // Allow reading (downloading) from this file
      expires: Date.now() + 60 * 60 * 1000, // URL expires in 1 hour
    });
  
    return url;
  }

}
