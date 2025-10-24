import { NotFoundException } from "../../shared/https/exceptions/NotFoundException";

export class MovieNotFoundException extends NotFoundException {
  constructor() {
    super("Movie not found.", "MOVIE_NOT_FOUND");
  }
}
