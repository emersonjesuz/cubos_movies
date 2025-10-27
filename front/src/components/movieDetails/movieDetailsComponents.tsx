import { useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/axios";
import useSizeScreen from "../../hooks/useSizeScreen";
import { handlerErrorApi } from "../../utils/handlerErrorApi";
import { movieState, useMovieStore } from "../../zustand/moviesStore";
import MovieDetailScreenDesktop from "./MovieDetailScreenDesktop";
import MovieDetailScreenMobile from "./MovieDetailScreenMobile";

export default function MovieDetailsComponents() {
  const { id } = useParams();
  const { setMovie, movie } = useMovieStore();
  const { width } = useSizeScreen();
  async function findMovie() {
    try {
      const { data } = await api.get("/movie/" + id);
      setMovie(data);
    } catch (error) {
      const message = handlerErrorApi(error);
      alert(message);
    }
  }
  useEffect(() => {
    setMovie(movieState);
    findMovie();
  }, []);

  return (
    <div className="z-10 relative w-full h-full p-4">
      <div
        className="h-[600px] w-[calc(100%-64px)] left-1/2 -translate-x-1/2 -top-2.5 md:top-5 absolute inset-0 bg-cover bg-center bg-no-repeat opacity-80 z-0 bg-[linear-gradient(276deg,rgba(18,17,19,0.52)_0%,rgba(18,17,19,0.93)_86%)]"
        style={{
          backgroundImage: ` url(${movie.urlBackground})`,
          backgroundSize: width > 700 ? "100%" : "300px",
        }}
      ></div>

      <MovieDetailScreenDesktop />
      <MovieDetailScreenMobile />
    </div>
  );
}
