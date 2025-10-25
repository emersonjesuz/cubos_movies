import { QueueService } from "../shared/services/queue/QueueService";
import { MovieInput } from "./dtos/MovieCreateInput";
import { MovieOutput } from "./dtos/MovieOutput";
import { MovieInputMapper } from "./mappers/MovieInputMapper";
import { MovieEntityMapper } from "./mappers/MovieEntityMapper";
import { MovieEntity } from "./MovieEntity";
import { MovieRepository } from "./MovieRepository";
import { MovieNotFoundException } from "./exceptions/MovieNotFoundException";
import { MovieFilter } from "./dtos/MovieFIlter";

export class MovieUseCase {
  private movies: MovieOutput[] = [];
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
  public async findAllBy(filter: MovieFilter) {
    await this.findAll(filter);
    await this.search(filter);
    await this.findAllByRelease(filter);
    await this.findAllByAgeRating(filter);
    await this.findAllByDuration(filter);
    const totalPage = await this.totalPages(filter);
    return { movies: this.movies, totalPage };
  }

  private async findAll(filter: MovieFilter) {
    if (filter.type === "ALL") {
      this.movies = await this.movieRepository.findAll(filter);
    }
  }
  private async search(filter: MovieFilter) {
    if (filter.type === "SEARCH") {
      this.movies = await this.movieRepository.search(filter);
    }
  }
  private async findAllByRelease(filter: MovieFilter) {
    if (filter.type === "RELEASE") {
      this.movies = await this.movieRepository.findAllByRelease(filter);
    }
  }
  private async findAllByDuration(filter: MovieFilter) {
    if (filter.type === "DURATION") {
      this.movies = await this.movieRepository.findAllByDuration(filter);
    }
  }
  private async findAllByAgeRating(filter: MovieFilter) {
    if (filter.type === "AGE_RATING") {
      this.movies = await this.movieRepository.findAllByAgeRating(filter);
    }
  }
  private async totalPages(filter: MovieFilter) {
    const totalItems = await this.movieRepository.totalItens(filter);
    return Math.ceil(totalItems / 10);
  }
}
