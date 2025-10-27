import { Suspense, useState } from "react";
import { CircularProgress } from "../progress/CircularProgressSvg";
import type { Movie } from "../../zustand/moviesStore";
import { useNavigate } from "react-router-dom";

interface Props {
  movie: Movie;
}

export default function MovieCard({ movie }: Props) {
  const [onHaver, setOnHover] = useState(false);
  const router = useNavigate();
  return (
    <div
      className="relative w-[183px] h-[281px] lg:w-[235px] lg:h-[355px]  rounded overflow-hidden cursor-pointer"
      onMouseOut={() => {
        setOnHover(false);
      }}
      onMouseOver={() => {
        setOnHover(true);
      }}
      onClick={() => router("/filme/" + movie.id)}
    >
      <Suspense fallback={<div>Carregando...</div>}>
        <img src={movie.urlCover} alt="Filme" className="w-full h-full object-cover" />
      </Suspense>
      <div className="absolute inset-0 bg-[#CCCCCC00] bg-[radial-gradient(circle,rgba(204,204,204,0)_1%,rgba(0,0,0,0.06)_64%,rgba(0,0,0,0.75)_100%)]"></div>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(204,204,204,0)_1%,rgba(0,0,0,0.06)_64%,rgba(0,0,0,0.75)_100%)]"></div>
      <div data-hover={onHaver} className="absolute left-1/2 top-[40%] -translate-1/2 data-[hover=true]:block hidden ">
        <CircularProgress className="w-[98px] h-[98px] lg:w-[140px] lg:h-[140px]" value={+movie.approvalRating} />
      </div>
      <div className="absolute bottom-0 flex flex-col justify-end w-full h-full">
        <div className="flex flex-col justify-end p-4 gap-2 w-full h-[40%]">
          <h1 className="text-[14px] lg:text-[16px]  font-bold lg:font-semibold uppercase">{movie.title}</h1>
          <p
            data-hover={onHaver}
            className="data-[hover=true]:block hidden duration-500 transition-opacity text-[#B4B4B4] text-[12.8px] font-normal"
          >
            {movie.genres.join(", ")}
          </p>
        </div>
      </div>
    </div>
  );
}
