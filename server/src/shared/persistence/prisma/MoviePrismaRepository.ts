import { Prisma } from "@prisma/client";
import { MovieFilter } from "../../../movies/dtos/MovieFIlter";
import { MovieOutput } from "../../../movies/dtos/MovieOutput";
import { MovieDbMapper } from "../../../movies/mappers/MovieDbMapper";
import { MovieEntity } from "../../../movies/MovieEntity";
import { MovieRepository } from "../../../movies/MovieRepository";
import { PrismaService } from "../../services/prisma/PrismaService";

export class MoviePrismaRepository implements MovieRepository {
  private prisma = PrismaService;
  private take = 10;

  private skip(page: number) {
    return (page - 1) * this.take;
  }
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
  public async update(movie: MovieEntity, id: string): Promise<MovieEntity> {
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
        id,
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
  async findByIdAndUser(id: string, userId: string): Promise<MovieEntity | null> {
    const movie = await this.prisma.movies.findFirst({
      where: {
        id,
        userId,
      },
      include: {
        users: true,
      },
    });
    if (!movie) return null;
    return MovieDbMapper.toMovieEntity(movie);
  }
  async delete(id: string): Promise<void> {
    await this.prisma.movies.delete({ where: { id } });
  }
  async findAll(filter: MovieFilter): Promise<MovieOutput[]> {
    const movies = await this.prisma.movies.findMany({
      include: {
        users: true,
      },
      take: this.take,
      skip: this.skip(filter.page),
    });
    return movies.map((movie) => MovieDbMapper.toMovieOutput(movie));
  }
  async search(filter: MovieFilter): Promise<MovieOutput[]> {
    const movies = await this.prisma.movies.findMany({
      where: this.whereSearch(filter),
      include: {
        users: true,
      },
      take: this.take,
      skip: this.skip(filter.page),
    });
    return movies.map((movie) => MovieDbMapper.toMovieOutput(movie));
  }
  async findAllByRelease(filter: MovieFilter): Promise<MovieOutput[]> {
    const movies = await this.prisma.movies.findMany({
      where: this.whereRelease(filter),
      include: {
        users: true,
      },
      take: this.take,
      skip: this.skip(filter.page),
    });
    return movies.map((movie) => MovieDbMapper.toMovieOutput(movie));
  }
  async findAllByDuration(filter: MovieFilter): Promise<MovieOutput[]> {
    const movies = await this.prisma.movies.findMany({
      where: this.whereDuration(filter),
      include: {
        users: true,
      },
      take: this.take,
      skip: this.skip(filter.page),
    });
    return movies.map((movie) => MovieDbMapper.toMovieOutput(movie));
  }
  async findAllByAgeRating(filter: MovieFilter): Promise<MovieOutput[]> {
    const movies = await this.prisma.movies.findMany({
      where: this.whereAgeRating(filter),
      include: {
        users: true,
      },
      take: this.take,
      skip: this.skip(filter.page),
    });
    return movies.map((movie) => MovieDbMapper.toMovieOutput(movie));
  }
  async totalItens(filter: MovieFilter): Promise<number> {
    const whereMap = {
      ALL: {},
      SEARCH: this.whereSearch(filter),
      RELEASE: this.whereRelease(filter),
      DURATION: this.whereDuration(filter),
      AGE_RATING: this.whereAgeRating(filter),
    };
    const where = whereMap[filter.type] ?? {};
    return this.prisma.movies.count({ where });
  }
  private whereDuration(filter: MovieFilter) {
    return {
      duration: filter.duration,
    };
  }
  private whereAgeRating(filter: MovieFilter) {
    return {
      ageRating: filter.ageRating,
    };
  }
  private whereRelease(filter: MovieFilter) {
    return {
      release: {
        gte: filter.startRelease,
        lte: filter.endRelease,
      },
    };
  }
  private whereSearch(filter: MovieFilter): Prisma.MoviesWhereInput {
    return {
      OR: [
        {
          title: {
            contains: filter.search,
            mode: "insensitive",
          },
        },
        {
          director: {
            contains: filter.search,
            mode: "insensitive",
          },
        },
      ],
    };
  }
}
