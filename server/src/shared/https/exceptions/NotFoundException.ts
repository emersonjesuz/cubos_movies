export class NotFoundException extends Error {
  public readonly status: number;
  public readonly code: string;
  constructor(message: string, code: string) {
    super(message);
    this.status = 404;
    this.code = code;
  }
}
