import { useMovieStore } from "../../zustand/moviesStore";

export default function SynopsisDescriptionAndGenresSection() {
  const { movie } = useMovieStore();
  return (
    <div className="flex justify-center lg:justify-start items-center flex-col gap-4 lg:w-[416px]">
      <p className="lg:hidden italic text-[16px]">{movie.description}</p>
      <div className="grid grid-cols-1 grid-rows-[auto_1fr] gap-2 rounded bg-[#232225BF] w-full  lg:h-[300px] p-4 ">
        <p className="uppercase font-bold text-[16px] text-[#B5B2BC]">Sinopse</p>
        <p className="font-normal text-[16px] text-[#EEEEF0] tracking-normal overflow-y-auto">{movie.synopsis}</p>
      </div>
      <div className="grid  gap-2 rounded bg-[#232225BF] w-full h-fit p-4 ">
        <p className="font-bold text-[14px] text-[#B5B2BC]">Generos</p>
        <div className="flex gap-2 flex-wrap font-semibold text-[14px] lg:text-[12px] text-white">
          {movie.genres.map((genre, index) => (
            <span key={index} className="bg-[#C150FF2E] rounded-xs p-2 uppercase">
              {genre}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
