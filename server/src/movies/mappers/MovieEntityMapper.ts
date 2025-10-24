import { MovieOutput } from "../dtos/MovieOutput";
import { MovieUserOutput } from "../dtos/MovieUserOutput";
import { MovieEntity } from "../MovieEntity";

export class MovieEntityMapper {
  public static toMovieOutput(input: MovieEntity): MovieOutput {
    const user = input.getUser()!;
    return new MovieOutput(
      input.getId(),
      input.getTitle(),
      input.getOriginalTitle(),
      input.getSynopsis(),
      input.getDescription(),
      input.getPopularity(),
      input.getRelease(),
      input.getBudget(),
      input.getRevenue(),
      input.getVotes(),
      input.getDuration(),
      input.getLanguage(),
      input.getProfit(),
      input.getStatus(),
      input.getUrlCover(),
      input.getUrlBackground(),
      input.getUrlTrailer(),
      input.getApprovalRating(),
      input.getCreatedAt(),
      input.getGenres(),
      input.getAgeRating(),
      input.getDirector(),
      new MovieUserOutput(user.getId(), user.getName())
    );
  }
}
