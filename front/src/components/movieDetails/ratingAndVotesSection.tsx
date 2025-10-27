import { useMovieStore } from "../../zustand/moviesStore";
import { CircularProgress } from "../progress/CircularProgressSvg";

export default function RatingAndVotesSection() {
  const { movie } = useMovieStore();
  return (
    <div className=" flex justify-center items-center gap-4">
      <div className="grid rounded bg-[#232225BF] min-w-[221px] lg:w-[211px] lg:min-w-[211px] h-[69px] p-4">
        <p className="uppercase font-bold text-[12px] text-[#B5B2BC]">Classificação Indicativa</p>
        <p className="font-semibold text-[14px] text-white">{movie.ageRating ?? 0} anos </p>
      </div>
      <div className="grid rounded bg-[#232225BF] w-[30%] min-w-[70px] lg:w-[76px] lg:min-w-[76px] h-[69px] p-4">
        <p className="uppercase font-bold text-[12px] text-[#B5B2BC]">Votos</p>
        <p className="font-semibold text-[14px] text-white">{movie.votes}</p>
      </div>
      <CircularProgress
        className="min-w-[69px] w-[69px] h-[69px] lg:w-[98px] lg:h-[98px] z-10"
        isBluer={false}
        value={+movie.approvalRating || 0}
      />
    </div>
  );
}
