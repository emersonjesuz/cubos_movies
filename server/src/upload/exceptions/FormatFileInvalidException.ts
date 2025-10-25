import { BadRequestException } from "../../shared/https/exceptions/BadRequestException";

export class FormatFileInvalidException extends BadRequestException {
  constructor() {
    super("Only send PNG or JPG files!", "FORMAT_FILE_INVALID");
  }
}
