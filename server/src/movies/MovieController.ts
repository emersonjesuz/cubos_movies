import { Response } from "express";
import { AuthenticatedRequest } from "../shared/interfaces/AuthenticatedRequest";
import { MoviePrismaRepository } from "../shared/persistence/prisma/MoviePrismaRepository";
import { movieSchema } from "./movieSchema";
import { MovieUseCase } from "./MovieUsecase";
import { QueueRabbitMQService } from "../shared/services/queue/QueueService";
export class MovieController {
  private readonly movieUseCse: MovieUseCase;
  constructor() {
    this.movieUseCse = new MovieUseCase(new MoviePrismaRepository(), new QueueRabbitMQService());
  }

  public async create(request: AuthenticatedRequest, response: Response) {
    const user = request.user!;
    const body = movieSchema.parse(request.body);
    const result = await this.movieUseCse.create(body, user.getId());
    return response.status(201).json(result);
  }
  public async update(request: AuthenticatedRequest, response: Response) {
    const user = request.user!;
    const { id } = request.params;
    const body = movieSchema.parse(request.body);
    const result = await this.movieUseCse.update(body, id, user.getId());
    return response.status(200).json(result);
  }
  public async find(request: AuthenticatedRequest, response: Response) {
    const user = request.user!;
    const { id } = request.params;
    const result = await this.movieUseCse.find(id, user.getId());
    return response.status(200).json(result);
  }

  public async delete(request: AuthenticatedRequest, response: Response) {
    const user = request.user!;
    const { id } = request.params;
    await this.movieUseCse.delete(id, user.getId());
    return response.status(200).json({ message: "Movie deleted success.", code: "SUCCESS" });
  }
}
