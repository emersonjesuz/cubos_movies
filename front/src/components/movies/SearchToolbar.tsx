import { useMovieFilterStore } from "../../zustand/filterMoviesStore";
import SearchIcon from "../icons/SearchIcon";
import FilterMoviesModal from "../modais/filterMoviesModal";
import HandlerMovieModal from "../modais/handlerMovieModal";

export default function SearchToolbar() {
  const { setSearch } = useMovieFilterStore();
  return (
    <div className="flex flex-col lg:flex-row items-end lg:items-center justify-center lg:justify-end gap-2.5 lg:p-3 p-4 w-full h-[130px] lg:h-[92px]">
      <div className="relative w-[382px] lg:w-[488px] h-11">
        <input
          type="text"
          placeholder="Pesquise por filmes"
          onChange={(e) => setSearch(e.target.value)}
          className="w-full h-full border border-[#49474E] rounded placeholder:text-[#6F6D78] placeholder:font-bold text-[16px] bg-[#1A191B] px-4 pr-10"
        />
        <SearchIcon className="absolute top-1/2 right-2.5 -translate-y-1/2 w-6 h-6 text-white" />
      </div>
      <div className="flex items-center w-fit h-11 gap-0.5 lg:gap-2.5">
        <FilterMoviesModal>
          <button className="flex items-center justify-center w-[136.75px] lg:w-[85px] h-full rounded-xs bg-[#B744F714] hover:bg-[#9A5CD0] focus:bg-[#8457AA] cursor-pointer text-[#F1DDFFFA] text-[16px]">
            Filtros
          </button>
        </FilterMoviesModal>
        <HandlerMovieModal type="CREATE" id="">
          <button className="flex items-center justify-center w-[242.93px] lg:w-[151px] h-full rounded-xs bg-[#8E4EC6] cursor-pointer hover:bg-[#9A5CD0] focus:bg-[#8457AA]  text-[#F1DDFFFA] text-[16px]">
            Adicionar Filmes
          </button>
        </HandlerMovieModal>
      </div>
    </div>
  );
}
