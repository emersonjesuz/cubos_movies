import { Request } from "express";
import { UserEntity } from "../../users/UserEntity";

export interface AuthenticatedRequest extends Request {
  user?: UserEntity;
}
