import { create } from "zustand";

export type TypeFIlter = "SEARCH" | "ALL" | "RELEASE" | "DURATION" | "AGE_RATING";

export interface MovieFilter {
  search: string;
  type: TypeFIlter;
  startRelease: Date;
  endRelease: Date;
  ageRating: string;
  duration: string;
  page: number;
  show: boolean;
}

interface MovieFilterState extends MovieFilter {
  setSearch: (value: string) => void;
  setDuration: (value: string) => void;
  setAgeRating: (value: string) => void;
  setStartRelease: (value: Date) => void;
  setEndRelease: (value: Date) => void;
  setPage: (value: number) => void;
  setType: (value: TypeFIlter) => void;
  reset: () => void;
  setShow: (value: boolean) => void;
}

const initialState: MovieFilter = {
  search: "",
  duration: "0",
  ageRating: "L",
  startRelease: new Date(),
  endRelease: new Date(),
  type: "ALL",
  page: 1,
  show: false,
};

export const useMovieFilterStore = create<MovieFilterState>((set) => ({
  ...initialState,

  setSearch: (value) =>
    set((state) => ({
      ...state,
      search: value,
      type: value ? "SEARCH" : "ALL",
    })),

  setDuration: (value) =>
    set((state) => ({
      ...state,
      duration: value,
      type: value ? "DURATION" : "ALL",
    })),

  setAgeRating: (value) =>
    set((state) => ({
      ...state,
      ageRating: value,
      type: value ? "AGE_RATING" : "ALL",
    })),

  setStartRelease: (value) =>
    set((state) => ({
      ...state,
      startRelease: value,
      type: "RELEASE",
    })),

  setEndRelease: (value) =>
    set((state) => ({
      ...state,
      endRelease: value,
      type: "RELEASE",
    })),

  setPage: (value) =>
    set((state) => ({
      ...state,
      page: value,
    })),

  setType: (value) =>
    set((state) => ({
      ...state,
      type: value,
    })),
  setShow: (value) =>
    set((state) => ({
      ...state,
      show: value,
    })),

  reset: () =>
    set((state) => ({
      ...initialState,
      type: state.type,
      search: state.search,
      page: state.page,
      ageRating: state.ageRating,
    })),
}));
