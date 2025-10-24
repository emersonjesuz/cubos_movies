import { MovieEntity } from "./MovieEntity";

export interface MovieRepository {
  create(movie: MovieEntity, userId: string): Promise<MovieEntity>;
  update(movie: MovieEntity, movieId: string): Promise<MovieEntity>;
  findById(id: string): Promise<MovieEntity | null>;
  findByIdAndUser(id: string, userId: string): Promise<MovieEntity | null>;
  delete(id: string): Promise<void>;
}
