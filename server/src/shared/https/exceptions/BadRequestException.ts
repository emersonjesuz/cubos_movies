export class BadRequestException extends Error {
  public readonly status: number;
  public readonly code: string;
  constructor(message: string, code: string) {
    super(message);
    this.status = 400;
    this.code = code;
  }
}
