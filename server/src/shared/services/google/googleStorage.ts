import path from "path";
import { Storage } from "@google-cloud/storage";
const keyPath = path.resolve(process.cwd(), process.env.GCP_KEY_PATH || "");

export const storage = new Storage({
  keyFilename: keyPath,
  projectId: process.env.GCP_PROJECT_ID,
});

export const bucket = storage.bucket(process.env.GCP_BUCKET_NAME || "");
