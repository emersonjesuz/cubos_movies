import { MovieWithUser } from "../../shared/interfaces/MovieWithUser";
import { UserEntity } from "../../users/UserEntity";
import { MovieEntity } from "../MovieEntity";

export class MovieDbMapper {
  public static toMovieEntity(input: MovieWithUser): MovieEntity {
    const user = input.users;
    return new MovieEntity(
      input.title,
      input.originalTitle,
      input.synopsis,
      input.description,
      input.popularity,
      input.release,
      input.budget.toNumber(),
      input.revenue.toNumber(),
      input.votes,
      input.duration,
      input.language,
      input.profit.toNumber(),
      input.status,
      input.urlCover,
      input.urlBackground,
      input.urlTrailer,
      input.approvalRating,
      input.genres,
      input.ageRating,
      input.director,
      new UserEntity(user.name, user.email, "", user.id),
      input.id
    );
  }
}
