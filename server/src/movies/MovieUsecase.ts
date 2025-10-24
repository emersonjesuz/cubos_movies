import { QueueService } from "../shared/services/queue/QueueService";
import { MovieInput } from "./dtos/MovieCreateInput";
import { MovieOutput } from "./dtos/MovieOutput";
import { MovieInputMapper } from "./mappers/MovieInputMapper";
import { MovieEntityMapper } from "./mappers/MovieEntityMapper";
import { MovieEntity } from "./MovieEntity";
import { MovieRepository } from "./MovieRepository";
import { MovieNotFoundException } from "./exceptions/MovieNotFoundException";

export class MovieUseCase {
  constructor(private readonly movieRepository: MovieRepository, private readonly queueService: QueueService) {}

  public async create(input: MovieInput, userId: string): Promise<MovieOutput> {
    const movie = MovieInputMapper.toMovieEntity(input);
    const movieCreated = await this.movieRepository.create(movie, userId);
    await this.sendToQueueIfReleasesFuture(movieCreated);
    return MovieEntityMapper.toMovieOutput(movieCreated);
  }

  public async update(input: MovieInput, id: string, userId: string) {
    const hasMovie = await this.movieRepository.findByIdAndUser(id, userId);
    if (!hasMovie) throw new MovieNotFoundException();
    const movie = MovieInputMapper.toMovieEntity(input);
    const movieUpdated = await this.movieRepository.update(movie, id);
    if (hasMovie.getRelease() < movie.getRelease()) {
      await this.sendToQueueIfReleasesFuture(movieUpdated);
    }
    return MovieEntityMapper.toMovieOutput(movieUpdated);
  }
  public async find(id: string, userId: string) {
    const hasMovie = await this.movieRepository.findByIdAndUser(id, userId);
    if (!hasMovie) throw new MovieNotFoundException();
    return MovieEntityMapper.toMovieOutput(hasMovie);
  }

  public async delete(id: string, userId: string) {
    const hasMovie = await this.movieRepository.findByIdAndUser(id, userId);
    if (!hasMovie) throw new MovieNotFoundException();
    await this.movieRepository.delete(id);
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
