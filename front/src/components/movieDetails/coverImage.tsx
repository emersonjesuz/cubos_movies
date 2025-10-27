import { Suspense } from "react";
import { useMovieStore } from "../../zustand/moviesStore";

export default function CoverImage() {
  const { movie } = useMovieStore();
  return (
    <div className="bg-[#00000033] rounded w-[382px] h-[582px] lg:h-[542px] pb-4 lg:pb-0 lg:w-[374px]">
      <Suspense fallback={<div>Carregando...</div>}>
        <img src={movie.urlCover} alt="Filme" className="w-full h-full object-cover rounded" />
      </Suspense>
    </div>
  );
}
