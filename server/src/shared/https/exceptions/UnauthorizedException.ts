export class UnauthorizedException extends Error {
  public readonly status: number;
  public readonly code: string;
  constructor(message: string, code: string) {
    super(message);
    this.status = 401;
    this.code = code;
  }
}
