import { BadRequestException } from "../../shared/https/exceptions/BadRequestException";
import { NotFoundException } from "../../shared/https/exceptions/NotFoundException";

export class EmailOrPasswordIncorrectException extends NotFoundException {
  constructor() {
    super("User already exists.", "USER_ALREADY_EXISTS");
  }
}
