import { MovieRepository } from "../movies/MovieRepository";
import { EmailService } from "../shared/services/email/EmailService";
import { movieHtmlTemplate } from "./movieHtmlTemplate";

export class EmailUseCase {
  constructor(private readonly emailService: EmailService, private readonly movieRepository: MovieRepository) {}
  public async sendReleaseMovie(movieId: string) {
    const movie = await this.movieRepository.findById(movieId);
    if (!movie) throw new Error("Movie not fund.");
    const user = movie.getUser();
    const html = movieHtmlTemplate(movie);
    await this.emailService.send({ email: user!.getEmail(), subject: "Vem lançamento novo por aí", html });
  }
}
