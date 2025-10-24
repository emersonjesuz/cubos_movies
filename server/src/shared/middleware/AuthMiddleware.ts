import { NextFunction, Response } from "express";
import { AuthenticatedRequest } from "../interfaces/AuthenticatedRequest";
import { UserPrismaRepository } from "../persistence/prisma/UserPrismaRepository";
import { JwtTokenService } from "../security/TokenService";

const responseUnauthorized = { message: "Invalid or expired token", code: "UNAUTHORIZED" };
export async function authMiddleware(request: AuthenticatedRequest, response: Response, next: NextFunction) {
  const tokenService = new JwtTokenService();
  const userRepository = new UserPrismaRepository();

  try {
    const token = request.headers.authorization?.split(" ")[1];
    if (!token) {
      response.status(401).json(responseUnauthorized);
      return;
    }

    const payload = tokenService.verify(token);
    if (!payload) {
      response.status(401).json(responseUnauthorized);
      return;
    }

    const userValid = await userRepository.findById(payload.id);
    if (!userValid) {
      response.status(401).json(responseUnauthorized);
      return;
    }
    userValid.setPassword("");
    request.user = userValid;
    next();
  } catch (error) {
    response.status(401).json(responseUnauthorized);
    return;
  }
}
