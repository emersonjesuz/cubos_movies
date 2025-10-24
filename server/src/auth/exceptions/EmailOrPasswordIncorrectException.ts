import { NotFoundException } from "../../shared/https/exceptions/NotFoundException";

export class EmailOrPasswordIncorrectException extends NotFoundException {
  constructor() {
    super("Email or password incorrect.", "EMAIL_PASSWORD_INCORRECT");
  }
}
