import { create } from "zustand";

export interface MovieUser {
  id: string;
  name: string;
}

export interface Movie {
  id: string;
  title: string;
  originalTitle: string;
  synopsis: string;
  description: string;
  popularity: string;
  release: Date;
  budget: number;
  revenue: number;
  votes: number;
  duration: string;
  language: string;
  profit: number;
  status: string;
  urlCover: string;
  urlBackground: string;
  urlTrailer: string;
  approvalRating: string;
  createdAt: Date;
  genres: string[];
  ageRating: string;
  director: string;
  user: MovieUser;
}

export const movieState: Movie = {
  id: "",
  title: "",
  originalTitle: "",
  synopsis: "",
  description: "",
  popularity: "",
  release: new Date(),
  budget: 0,
  revenue: 0,
  votes: 0,
  duration: "",
  language: "",
  profit: 0,
  status: "",
  urlCover: "",
  urlBackground: "",
  urlTrailer: "",
  approvalRating: "",
  createdAt: new Date(),
  genres: [],
  ageRating: "",
  director: "",
  user: {
    id: "",
    name: "",
  },
};

interface MovieStoreState {
  movies: Movie[];
  movie: Movie;
  setMovies: (movies: Movie[]) => void;
  addMovie: (movie: Movie) => void;
  setMovie: (movie: Movie) => void;
  clearMovies: () => void;
  totalPages: number;
}

export const useMovieStore = create<MovieStoreState>((set) => ({
  movies: [],
  movie: movieState as Movie,
  setMovie: (movie) => set({ movie }),
  totalPages: 0,
  setMovies: (movies) => set({ movies }),
  setTotalPage: (value: number) => set({ totalPages: value }),
  addMovie: (movie) =>
    set((state) => ({
      movies: [...state.movies, movie],
    })),

  clearMovies: () => set({ movies: [] }),
}));
