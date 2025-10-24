import { MovieUserOutput } from "./MovieUserOutput";

export class MovieOutput {
  constructor(
    readonly id: string,
    readonly title: string,
    readonly originalTitle: string,
    readonly synopsis: string,
    readonly description: string,
    readonly popularity: string,
    readonly release: Date,
    readonly budget: number,
    readonly revenue: number,
    readonly votes: number,
    readonly duration: string,
    readonly language: string,
    readonly profit: number,
    readonly status: string,
    readonly urlCover: string,
    readonly urlBackground: string,
    readonly urlTrailer: string,
    readonly approvalRating: string,
    readonly createdAt: Date,
    readonly genres: string[],
    readonly ageRating: string,
    readonly director: string,
    readonly user: MovieUserOutput
  ) {}
}
