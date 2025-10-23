import { BadRequestException } from "../../shared/https/exceptions/BadRequestException";

export class UserAlreadyExistsException extends BadRequestException {
  constructor() {
    super("User already exists.", "USER_ALREADY_EXISTS");
  }
}
