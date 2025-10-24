import { MovieDbMapper } from "../../../movies/mappers/MovieDbMapper";
import { MovieEntity } from "../../../movies/MovieEntity";
import { MovieRepository } from "../../../movies/MovieRepository";
import { PrismaService } from "../../services/prisma/PrismaService";

export class MoviePrismaRepository implements MovieRepository {
  private prisma = PrismaService;
  public async create(movie: MovieEntity, userId: string): Promise<MovieEntity> {
    const movieCreated = await this.prisma.movies.create({
      data: {
        approvalRating: movie.getApprovalRating(),
        budget: movie.getBudget(),
        description: movie.getDescription(),
        duration: movie.getDuration(),
        language: movie.getLanguage(),
        originalTitle: movie.getOriginalTitle(),
        popularity: movie.getPopularity(),
        profit: movie.getProfit(),
        release: movie.getRelease(),
        revenue: movie.getRevenue(),
        status: movie.getStatus(),
        synopsis: movie.getSynopsis(),
        title: movie.getTitle(),
        urlBackground: movie.getUrlBackground(),
        urlCover: movie.getUrlCover(),
        urlTrailer: movie.getUrlTrailer(),
        votes: movie.getVotes(),
        genres: movie.getGenres(),
        userId: userId,
        ageRating: movie.getAgeRating(),
        director: movie.getDirector(),
      },
      include: {
        users: true,
      },
    });
    return MovieDbMapper.toMovieEntity(movieCreated);
  }

  public async update(movie: MovieEntity, movieId: string): Promise<MovieEntity> {
    const movieCreated = await this.prisma.movies.update({
      data: {
        approvalRating: movie.getApprovalRating(),
        budget: movie.getBudget(),
        description: movie.getDescription(),
        duration: movie.getDuration(),
        language: movie.getLanguage(),
        originalTitle: movie.getOriginalTitle(),
        popularity: movie.getPopularity(),
        profit: movie.getProfit(),
        release: movie.getRelease(),
        revenue: movie.getRevenue(),
        status: movie.getStatus(),
        synopsis: movie.getSynopsis(),
        title: movie.getTitle(),
        urlBackground: movie.getUrlBackground(),
        urlCover: movie.getUrlCover(),
        urlTrailer: movie.getUrlTrailer(),
        votes: movie.getVotes(),
        genres: movie.getGenres(),
        ageRating: movie.getAgeRating(),
        director: movie.getDirector(),
      },
      where: {
        id: movieId,
      },
      include: {
        users: true,
      },
    });
    return MovieDbMapper.toMovieEntity(movieCreated);
  }

  async findById(id: string): Promise<MovieEntity | null> {
    const movie = await this.prisma.movies.findUnique({
      where: {
        id,
      },
      include: {
        users: true,
      },
    });
    if (!movie) return null;
    return MovieDbMapper.toMovieEntity(movie);
  }
}
