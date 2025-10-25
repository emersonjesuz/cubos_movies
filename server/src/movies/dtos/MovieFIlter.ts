export type TypeFIlter = "SEARCH" | "ALL" | "RELEASE" | "DURATION" | "AGE_RATING";
export interface MovieFilter {
  search: string;
  type: TypeFIlter;
  startRelease: Date;
  endRelease: Date;
  ageRating: "L" | "12" | "14" | "18";
  duration: string;
  page: number;
}
