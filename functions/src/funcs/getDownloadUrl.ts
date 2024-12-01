import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import VideoService from '@/core/services/videoService';
import { CallableContext, HttpsError } from 'firebase-functions/v1/https';
import { useAuth } from '@/utils/auth';
import { Validator } from '@/core/services/validator';
import { SchemaType } from '@/core/interfaces/validator';
import { GetSignedUploadUrlRequest } from '@/core/data/video';

const isValidate = (data: GetSignedUploadUrlRequest) => {
  return Validator.validate(SchemaType.GET_UPLOAD_URL, data);
}

export const getDownloadUrl = functions.https.onCall(
  async (data: GetSignedUploadUrlRequest, context: CallableContext) => {
    try {
      await useAuth(context, 'user');

      if(!isValidate(data)) {
        throw new HttpsError('invalid-argument', Validator.errors);
      }

      const videoService = new VideoService(
        admin.auth(),
        admin.firestore(),
        admin.storage()
      );
      
      let { filePath } = data;

      return await videoService.generateDownloadUrl(filePath);
    } catch (error: any) {
      if (error instanceof HttpsError) {
        throw error;
      }
      throw new functions.https.HttpsError('internal', error.message);
    }
  }
);