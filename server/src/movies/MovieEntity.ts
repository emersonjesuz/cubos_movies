import { UserEntity } from "../users/UserEntity";

export class MovieEntity {
  private readonly id?: string;
  private title: string;
  private originalTitle: string;
  private synopsis: string;
  private description: string;
  private popularity: string;
  private release: Date;
  private budget: number;
  private revenue: number;
  private votes: number;
  private duration: string;
  private language: string;
  private profit: number;
  private status: string;
  private urlCover: string;
  private urlBackground: string;
  private urlTrailer: string;
  private approvalRating: string;
  private ageRating: string;
  private director: string;
  private readonly createdAt: Date;
  private genres: string[];
  private user?: UserEntity;

  constructor(
    title: string,
    originalTitle: string,
    synopsis: string,
    description: string,
    popularity: string,
    release: Date,
    budget: number,
    revenue: number,
    votes: number,
    duration: string,
    language: string,
    profit: number,
    status: string,
    urlCover: string,
    urlBackground: string,
    urlTrailer: string,
    approvalRating: string,
    genres: string[],
    ageRating: string,
    director: string,
    user?: UserEntity,
    id?: string,
    createdAt: Date = new Date()
  ) {
    this.id = id;
    this.title = title;
    this.originalTitle = originalTitle;
    this.synopsis = synopsis;
    this.description = description;
    this.popularity = popularity;
    this.release = release;
    this.budget = budget;
    this.revenue = revenue;
    this.votes = votes;
    this.duration = duration;
    this.language = language;
    this.profit = profit;
    this.status = status;
    this.urlCover = urlCover;
    this.urlBackground = urlBackground;
    this.urlTrailer = urlTrailer;
    this.approvalRating = approvalRating;
    this.createdAt = createdAt;
    this.genres = genres;
    this.user = user;
    this.ageRating = ageRating;
    this.director = director;
  }

  public getId(): string {
    return this.id!;
  }
  public getUser(): UserEntity | undefined {
    return this.user;
  }
  public getTitle(): string {
    return this.title;
  }
  public getOriginalTitle(): string {
    return this.originalTitle;
  }
  public getSynopsis(): string {
    return this.synopsis;
  }
  public getDescription(): string {
    return this.description;
  }
  public getPopularity(): string {
    return this.popularity;
  }
  public getRelease(): Date {
    return this.release;
  }
  public getBudget(): number {
    return this.budget;
  }
  public getRevenue(): number {
    return this.revenue;
  }
  public getVotes(): number {
    return this.votes;
  }
  public getDuration(): string {
    return this.duration;
  }
  public getLanguage(): string {
    return this.language;
  }
  public getProfit(): number {
    return this.profit;
  }
  public getStatus(): string {
    return this.status;
  }
  public getUrlCover(): string {
    return this.urlCover;
  }
  public getUrlBackground(): string {
    return this.urlBackground;
  }
  public getUrlTrailer(): string {
    return this.urlTrailer;
  }
  public getApprovalRating(): string {
    return this.approvalRating;
  }
  public getAgeRating(): string {
    return this.ageRating;
  }
  public getDirector(): string {
    return this.director;
  }
  public getCreatedAt(): Date {
    return this.createdAt;
  }
  public getGenres(): string[] {
    return this.genres;
  }
}
