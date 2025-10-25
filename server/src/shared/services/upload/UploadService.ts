import { bucket } from "../google/googleStorage";

export interface UploadService {
  create(file: Express.Multer.File): Promise<{ url: string }>;
}

export class GoogleStorageUploadService implements UploadService {
  async create(file: Express.Multer.File): Promise<{ url: string }> {
    const destination = `uploads/${Date.now()}-${file.originalname}`;
    const blob = bucket.file(destination);
    await blob.save(file.buffer, {
      contentType: file.mimetype,
      resumable: false,
    });
    const url = `https://storage.googleapis.com/${bucket.name}/${destination}`;
    return { url };
  }
}
