import multer from "multer";
import { FormatFileInvalidException } from "./exceptions/FormatFileInvalidException";

const storage = multer.memoryStorage();
export const multerConfig = multer({
  storage,
  limits: { fileSize: 1024 * 1024 * 2 },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
      return cb(new FormatFileInvalidException());
    }
    cb(null, true);
  },
}).single("arquivo");
