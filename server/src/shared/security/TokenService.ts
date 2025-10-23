import jwt from "jsonwebtoken";
import { UnauthorizedException } from "../https/exceptions/UnauthorizedException";

type Payload = {
  email: string;
};
export interface TokenService {
  generated(payload: Payload): string;
  verify(token: string): Payload;
}

export class JwtTokenService implements TokenService {
  private readonly JWT_SECRET = process.env.JWT_SECRET || "default_secret";
  public generated(payload: object): string {
    return jwt.sign(payload, this.JWT_SECRET, { expiresIn: "1d" });
  }

  public verify(token: string): Payload {
    try {
      return jwt.verify(token, this.JWT_SECRET) as Payload;
    } catch (error) {
      throw new UnauthorizedException("Invalid or expired token", "UNAUTHORIZED");
    }
  }
}
