import { MovieCreateInput } from "./dtos/MovieCreateInput";
import { MovieOutput } from "./dtos/MovieOutput";
import { MovieCreateInputMapper } from "./mappers/MovieCreateInputMapper";
import { MovieEntityMapper } from "./mappers/MovieEntityMapper";
import { MovieRepository } from "./MovieRepository";

export class MovieUseCase {
  constructor(private readonly movieRepository: MovieRepository) {}

  public async create(input: MovieCreateInput, userId: string): Promise<MovieOutput> {
    const movie = MovieCreateInputMapper.toMovieEntity(input);
    const movieCreated = await this.movieRepository.create(movie, userId);
    return MovieEntityMapper.toMovieOutput(movieCreated);
  }
}
