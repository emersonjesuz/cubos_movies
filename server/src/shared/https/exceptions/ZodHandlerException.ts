import z from "zod";

export class ZodHandlerException {
  public readonly status: number;
  public readonly code: string;
  public readonly message: string;
  constructor(err: z.ZodError) {
    try {
      const firstError = err.issues[0];
      const message = firstError.message.split("MESSAGE:")[1].split("CODE:")[0].trim();
      const code = firstError.message.split("CODE:")[1].trim();
      this.message = message;
      this.status = 400;
      this.code = code;
    } catch (error) {
      this.code = "INTERNAL_ERROR";
      this.status = 500;
      this.message = "Error extracting CODE and MESSAGE in zod";
    }
  }
}
