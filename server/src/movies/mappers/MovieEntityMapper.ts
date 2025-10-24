import { MovieOutput } from "../dtos/MovieOutput";
import { MovieUserOutput } from "../dtos/MovieUserOutput";
import { MovieEntity } from "../MovieEntity";

export class MovieEntityMapper {
  public static toMovieOutput(input: MovieEntity): MovieOutput {
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
      new MovieUserOutput(input.getUser().getId(), input.getUser().getName())
    );
  }
}
