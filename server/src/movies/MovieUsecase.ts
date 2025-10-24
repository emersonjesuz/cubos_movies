import { QueueService } from "../shared/services/queue/QueueService";
import { MovieCreateInput } from "./dtos/MovieCreateInput";
import { MovieOutput } from "./dtos/MovieOutput";
import { MovieCreateInputMapper } from "./mappers/MovieCreateInputMapper";
import { MovieEntityMapper } from "./mappers/MovieEntityMapper";
import { MovieEntity } from "./MovieEntity";
import { MovieRepository } from "./MovieRepository";

export class MovieUseCase {
  constructor(private readonly movieRepository: MovieRepository, private readonly queueService: QueueService) {}

  public async create(input: MovieCreateInput, userId: string): Promise<MovieOutput> {
    const movie = MovieCreateInputMapper.toMovieEntity(input);
    const movieCreated = await this.movieRepository.create(movie, userId);
    await this.sendToQueueIfReleasesFuture(movieCreated);
    return MovieEntityMapper.toMovieOutput(movieCreated);
  }

  private async sendToQueueIfReleasesFuture(movie: MovieEntity) {
    const delay = new Date(movie.getRelease()).getTime() - Date.now();
    if (delay > 0) {
      await this.queueService.producer({
        queueName: "MOVIE",
        executedAt: delay,
        payload: { id: movie.getId(), executedAt: new Date(movie.getRelease()).getTime() },
      });
    }
  }
}
