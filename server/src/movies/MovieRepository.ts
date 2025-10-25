import { MovieFilter } from "./dtos/MovieFIlter";
import { MovieOutput } from "./dtos/MovieOutput";
import { MovieEntity } from "./MovieEntity";

export interface MovieRepository {
  create(movie: MovieEntity, userId: string): Promise<MovieEntity>;
  update(movie: MovieEntity, movieId: string): Promise<MovieEntity>;
  findById(id: string): Promise<MovieEntity | null>;
  findByIdAndUser(id: string, userId: string): Promise<MovieEntity | null>;
  delete(id: string): Promise<void>;
  findAll(filter: MovieFilter): Promise<MovieOutput[]>;
  search(filter: MovieFilter): Promise<MovieOutput[]>;
  findAllByRelease(filter: MovieFilter): Promise<MovieOutput[]>;
  findAllByDuration(filter: MovieFilter): Promise<MovieOutput[]>;
  findAllByAgeRating(filter: MovieFilter): Promise<MovieOutput[]>;
  totalItens(filter: MovieFilter): Promise<number>;
}
