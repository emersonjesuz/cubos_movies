import { Request, response, Response } from "express";
import { GoogleStorageUploadService, UploadService } from "../shared/services/upload/UploadService";
import { multerConfig } from "./multerConfig";
import { FileInvalidException } from "./exceptions/FileInvalidException";

interface MulterRequest extends Request {
  file?: any;
}

export class UploadController {
  private readonly uploadService: UploadService;
  constructor() {
    this.uploadService = new GoogleStorageUploadService();
  }

  public async save(req: Request, res: Response) {
    multerConfig(req, res, async (err) => {
      if (err) throw new FileInvalidException();
      if (!req.file) throw new FileInvalidException();
      const { url } = await this.uploadService.create(req.file);
      return res.status(200).json({ url });
    });
  }
}
