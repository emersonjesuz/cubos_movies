import { useMovieStore } from "../../zustand/moviesStore";

export default function TitlesSection({ ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const { movie } = useMovieStore();
  return (
    <div {...props}>
      <h1 className="font-semibold text-[32px] text-[#EEEEF0]">{movie.title}</h1>
      <h3 className="text-[14px] lg:text-[16px] text-[#B5B2BC]">Título original: {movie.originalTitle}</h3>
    </div>
  );
}
