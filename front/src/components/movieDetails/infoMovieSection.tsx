import { useMovieStore } from "../../zustand/moviesStore";

export default function InfoMovieSection() {
  const { movie } = useMovieStore();
  function formatMinutes(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const minutesRemainder = minutes % 60;
    return `${hours}h ${minutesRemainder}m`;
  }

  function formatDate(date: Date): string {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  function formatMoney(value: string) {
    return value.slice(0, 6);
  }

  return (
    <div className="flex flex-col lg:flex-wrap justify-center items-center lg:justify-start gap-4 w-full lg:max-w-[416px]">
      <div className="flex justify-center items-center gap-4 w-full">
        <div className="grid rounded bg-[#232225BF] w-1/2 min-w-[183px] h-[72px] p-4">
          <p className="uppercase font-bold text-[12px] text-[#B5B2BC]">Lançamento</p>
          <p className="font-semibold text-[14px] text-white">{formatDate(new Date(movie.release))}</p>
        </div>
        <div className="grid rounded bg-[#232225BF] w-1/2 min-w-[183px] h-[72px] p-4">
          <p className="uppercase font-bold text-[12px] text-[#B5B2BC]">Duração</p>
          <p className="font-semibold text-[14px] text-white">{formatMinutes(+movie.duration)}</p>
        </div>
      </div>
      <div className="flex justify-center items-center gap-4 w-full">
        <div className="grid rounded bg-[#232225BF] w-1/2 min-w-[183px] h-[72px] p-4">
          <p className="uppercase font-bold text-[12px] text-[#B5B2BC]">Situação</p>
          <p className="font-semibold text-[14px] text-white">{movie.status}</p>
        </div>
        <div className="grid rounded bg-[#232225BF] w-1/2 min-w-[183px] h-[72px] p-4">
          <p className="uppercase font-bold text-[12px] text-[#B5B2BC]">Idioma</p>
          <p className="font-semibold text-[14px] text-white">{movie.language}</p>
        </div>
      </div>
      <div className="flex justify-center items-center gap-4 w-full min-w-[382px]">
        <div className="grid rounded bg-[#232225BF] w-full h-[72px] p-4">
          <p className="uppercase font-bold text-[12px] text-[#B5B2BC]">Orçamento</p>
          <p className="font-semibold text-[14px] text-white">${formatMoney(String(movie.budget))}M</p>
        </div>
        <div className="grid rounded bg-[#232225BF] w-full h-[72px] p-4">
          <p className="uppercase font-bold text-[12px] text-[#B5B2BC]">Receita</p>
          <p className="font-semibold text-[14px] text-white">${formatMoney(String(movie.revenue))}M</p>
        </div>
        <div className="grid rounded bg-[#232225BF] w-full h-[72px] p-4">
          <p className="uppercase font-bold text-[12px] text-[#B5B2BC]">lucro</p>
          <p className="font-semibold text-[14px] text-white">${formatMoney(String(movie.profit))}M</p>
        </div>
      </div>
    </div>
  );
}
