import { MovieEntity } from "./MovieEntity";

export interface MovieRepository {
  create(movie: MovieEntity, userId: string): Promise<MovieEntity>;
}
