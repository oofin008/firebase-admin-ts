import * as admin from "firebase-admin";
import VideoService from "@/core/services/videoService";

jest.mock("firebase-admin", () => {
  const original = jest.requireActual("firebase-admin");
  return {
    ...original,
    firestore: {
      ...original.firestore,
      FieldValue: {
        serverTimestamp: jest.fn(), // Mock serverTimestamp
      },
    },
  };
});

describe("VideoService", () => {
  let mockAuth: jest.Mocked<admin.auth.Auth>;
  let mockFirestore: jest.Mocked<admin.firestore.Firestore>;
  let mockStorage: jest.Mocked<admin.storage.Storage>;
  let videoService: VideoService;

  beforeEach(() => {
    mockAuth = {} as jest.Mocked<admin.auth.Auth>;
    mockFirestore = {
      collection: jest.fn().mockReturnValue({
        doc: jest.fn().mockReturnValue({
          set: jest.fn(),
        }),
      }),
    } as any; // Mock Firestore methods

    mockStorage = {
      bucket: jest.fn().mockReturnValue({
        file: jest.fn().mockReturnValue({
          createResumableUpload: jest.fn().mockResolvedValue(["mocked-upload-url"]),
          getSignedUrl: jest.fn().mockResolvedValue(["mocked-download-url"]),
        }),
      }),
    } as any; // Mock Storage methods

    videoService = new VideoService(mockAuth, mockFirestore, mockStorage);

    // Mock FieldValue.serverTimestamp to return a fixed timestamp
    (admin.firestore.FieldValue.serverTimestamp as jest.Mock).mockReturnValue("mocked-timestamp");
  });

  it("should generate a signed upload URL", async () => {
    const filePath = "videos/test-video.mp4";
    const url = await videoService.generateSignedUploadUrl(filePath);
    expect(url).toBe("mocked-upload-url");
    expect(mockStorage.bucket().file).toHaveBeenCalledWith(filePath);
    expect(mockStorage.bucket().file(filePath).createResumableUpload).toHaveBeenCalledWith({
      metadata: {
        contentType: "video/mp4",
        cacheControl: "public, max-age=31536000",
      }
    });
  });

  it("should generate a signed download URL", async () => {
    const filePath = "videos/test-video.mp4";
    const url = await videoService.generateDownloadUrl(filePath);
    expect(url).toBe("mocked-download-url");
    expect(mockStorage.bucket().file).toHaveBeenCalledWith(filePath);
    expect(mockStorage.bucket().file(filePath).getSignedUrl).toHaveBeenCalled();
  });
});