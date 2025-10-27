export type TypeFIlter = "SEARCH" | "ALL" | "RELEASE" | "DURATION" | "AGE_RATING";
export interface MovieFilter {
  search: string;
  type: TypeFIlter;
  startRelease: Date;
  endRelease: Date;
  ageRating: string;
  duration: string;
  page: number;
}
