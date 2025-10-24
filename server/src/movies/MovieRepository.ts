import { MovieEntity } from "./MovieEntity";

export interface MovieRepository {
  create(movie: MovieEntity, userId: string): Promise<MovieEntity>;
  findById(id: string): Promise<MovieEntity | null>;
}
