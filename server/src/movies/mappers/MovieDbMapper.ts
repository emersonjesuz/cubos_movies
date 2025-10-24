import { Movies, Prisma } from "@prisma/client";
import { MovieCreateInput } from "../dtos/MovieCreateInput";
import { MovieEntity } from "../MovieEntity";
import { UserEntity } from "../../users/UserEntity";
import { MovieWithUser } from "../../shared/interfaces/MovieWithUser";

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
      new UserEntity(user.name, user.email, "", user.id)
    );
  }
}
