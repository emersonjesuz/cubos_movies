import { NextFunction, Request, Response } from "express";
import { GoogleStorageUploadService, UploadService } from "../shared/services/upload/UploadService";
import { FileInvalidException } from "./exceptions/FileInvalidException";
import { multerConfig } from "./multerConfig";

export class UploadController {
  private readonly uploadService: UploadService;
  constructor() {
    this.uploadService = new GoogleStorageUploadService();
  }

  public async save(req: Request, res: Response, next: NextFunction) {
    multerConfig(req, res, async (err) => {
      if (err) return next(new FileInvalidException());
      if (!req.file) return next(new FileInvalidException());
      const { url } = await this.uploadService.create(req.file);
      return res.status(200).json({ url });
    });
  }
}
