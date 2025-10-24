import { Response } from "express";
import { AuthenticatedRequest } from "../shared/interfaces/AuthenticatedRequest";
import { MoviePrismaRepository } from "../shared/persistence/prisma/MoviePrismaRepository";
import { movieCreateSchema } from "./movieSchema";
import { MovieUseCase } from "./MovieUsecase";
import { QueueRabbitMQService } from "../shared/services/queue/QueueService";
export class MovieController {
  private readonly movieUseCse: MovieUseCase;
  constructor() {
    this.movieUseCse = new MovieUseCase(new MoviePrismaRepository(), new QueueRabbitMQService());
  }

  public async create(request: AuthenticatedRequest, response: Response) {
    const user = request.user!;
    const body = movieCreateSchema.parse(request.body);
    const result = await this.movieUseCse.create(body, user.getId());
    return response.status(201).json(result);
  }
}
