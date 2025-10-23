import { Request, Response } from "express";
import { AuthUseCase } from "./AuthUsecase";
import { UserPrismaRepository } from "../users/UserRepository";
import { BcryptPasswordEncoder } from "../shared/security/PasswordEncoder";
import { loginSchema, registerUserSchema } from "./authSchema";
import { JwtTokenService } from "../shared/security/TokenService";

export class AuthController {
  private authUseCase: AuthUseCase;

  constructor() {
    this.authUseCase = new AuthUseCase(new UserPrismaRepository(), new BcryptPasswordEncoder(), new JwtTokenService());
  }

  public async register(request: Request, response: Response) {
    const body = registerUserSchema.parse(request.body);
    await this.authUseCase.register(body);
    return response.status(201).json({ message: "User register success.", code: "SUCCESS" });
  }
  public async login(request: Request, response: Response) {
    const body = loginSchema.parse(request.body);
    const token = await this.authUseCase.login(body);
    return response.status(201).json({ token, code: "SUCCESS" });
  }
}
