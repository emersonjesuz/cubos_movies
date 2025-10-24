import { MovieCreateInput } from "../dtos/MovieCreateInput";
import { MovieEntity } from "../MovieEntity";

export class MovieCreateInputMapper {
  public static toMovieEntity(input: MovieCreateInput): MovieEntity {
    return new MovieEntity(
      input.title,
      input.originalTitle,
      input.synopsis,
      input.description,
      input.popularity,
      input.release,
      input.budget,
      input.revenue,
      input.votes,
      input.duration,
      input.language,
      input.profit,
      input.status,
      input.urlCover,
      input.urlBackground,
      input.urlTrailer,
      input.approvalRating,
      input.genres,
      input.ageRating,
      input.director
    );
  }
}
