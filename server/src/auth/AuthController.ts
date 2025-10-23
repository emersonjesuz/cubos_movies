import { Request, Response } from "express";
import { AuthUseCase } from "./AuthUsecase";
import { UserPrismaRepository } from "../users/UserRepository";
import { BcryptPasswordEncoder } from "../shared/security/PasswordEncoder";
import { registerUserSchema } from "./authSchema";

export class AuthController {
  private authUseCase: AuthUseCase;

  constructor() {
    this.authUseCase = new AuthUseCase(new UserPrismaRepository(), new BcryptPasswordEncoder());
  }

  public async register(request: Request, response: Response) {
    const body = registerUserSchema.parse(request.body);
    await this.authUseCase.register(body);
    return response.status(201).json({ message: "User register success.", code: "SUCCESS" });
  }
}
