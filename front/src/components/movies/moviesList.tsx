import { useMovieStore } from "../../zustand/moviesStore";
import MovieCard from "./movieCard";

export default function MoviesList() {
  const { movies } = useMovieStore();
  return (
    <div className="flex flex-wrap min-w-[414px] w-full max-w-[1322px] h-fit rounded gap-4 lg:gap-6 lg:p-6 p-4 bg-[#232225] lg:bg-[#EBEAF814] ">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}
