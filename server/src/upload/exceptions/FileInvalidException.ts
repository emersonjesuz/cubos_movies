import { BadRequestException } from "../../shared/https/exceptions/BadRequestException";

export class FileInvalidException extends BadRequestException {
  constructor() {
    super("File invalid or absent", "FILE_INVALID");
  }
}
