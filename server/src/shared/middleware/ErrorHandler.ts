import { Request, Response, NextFunction } from "express";
import { BadRequestException } from "../https/exceptions/BadRequestException";
import z from "zod";
import { ZodHandlerException } from "../https/exceptions/ZodHandlerException";
import { NotFoundException } from "../https/exceptions/NotFoundException";
import { UnauthorizedException } from "../https/exceptions/UnauthorizedException";

export class ErrorHandler {
  public process(err: any, req: Request, res: Response, next: NextFunction) {
    if (err instanceof BadRequestException) {
      return res.status(err.status).json({
        status: err.status,
        code: err.code,
        message: err.message,
      });
    }

    if (err instanceof NotFoundException) {
      return res.status(err.status).json({
        status: err.status,
        code: err.code,
        message: err.message,
      });
    }
    if (err instanceof UnauthorizedException) {
      return res.status(err.status).json({
        status: err.status,
        code: err.code,
        message: err.message,
      });
    }

    if (err instanceof z.ZodError) {
      const zodError = new ZodHandlerException(err);
      return res.status(400).json({
        status: zodError.status,
        code: zodError.code,
        message: zodError.message,
      });
    }

    return res.status(500).json({
      status: 500,
      code: "INTERNAL_ERROR",
      message: "Internal server error",
    });
  }
}
