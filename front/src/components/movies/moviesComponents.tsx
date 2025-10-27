import { useEffect } from "react";
import MoviesList from "./moviesList";
import Pagination from "./pagination";
import SearchToolbar from "./SearchToolbar";
import { useMovieFilterStore } from "../../zustand/filterMoviesStore";
import api from "../../api/axios";
import { useMovieStore } from "../../zustand/moviesStore";
import { handlerErrorApi } from "../../utils/handlerErrorApi";

export default function MoviesComponents() {
  const { search, page, show, ageRating, duration, endRelease, type, startRelease, setShow, reset } = useMovieFilterStore();
  const { setMovies } = useMovieStore();

  async function findAllMovies() {
    try {
      const { data } = await api.get(
        `/movie?type=${type}&search=${search}&startRelease=${startRelease.toDateString()}&endRelease=${endRelease.toDateString()}&duration=${duration}&ageRating=${ageRating}&page=${page}`
      );
      setMovies(data.movies);
    } catch (error) {
      const message = handlerErrorApi(error);
      alert(message);
    } finally {
      reset();
      setShow(false);
    }
  }

  useEffect(() => {
    findAllMovies();
  }, [search, page, show]);
  return (
    <main className="flex flex-col justify-center lg:px-4 lg:pt-4">
      <SearchToolbar />
      <MoviesList />
      <Pagination />
    </main>
  );
}
