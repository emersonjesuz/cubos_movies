import useSizeScreen from "../../hooks/useSizeScreen";
import { useMovieFilterStore } from "../../zustand/filterMoviesStore";
import { useThemeStore } from "../../zustand/themeStore";
import ArrowLeftIcon from "../icons/ArrowLeftIcon";
import ArrowRightIcon from "../icons/ArrowRightIcon";

export default function Pagination() {
  const { setPage: setActivePage, page: activePage } = useMovieFilterStore();
  const { width } = useSizeScreen();
  const { theme } = useThemeStore();
  const pages = [1, 2, 3, 4, 5];

  return (
    <div className="flex items-center justify-center h-[76px] lg:h-[92px] w-full">
      <div className="flex items-center gap-3">
        <button
          onClick={() => setActivePage(activePage > 1 ? activePage - 1 : 1)}
          data-theme={theme === "light"}
          className="flex items-center justify-center data-[theme=true]:bg-[#8E4EC6] bg-[#EBEAF814] hover:bg-[#EEE7FF5D] cursor-pointer w-16 h-11 rounded-xs duration-300"
        >
          <ArrowLeftIcon />
        </button>
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => setActivePage(page)}
            data-page={page}
            className={`
            ${width < 1024 && page >= 4 ? "hidden" : "flex "}
            ${
              activePage === page || activePage > 5
                ? "bg-[#ebeaf84d]  hover:bg-[#EEE7FF5D]"
                : "bg-[#8E4EC6]  hover:bg-[#9A5CD0] focus:bg-[#8457AA]"
            }
              items-center cursor-pointer justify-center w-[50px]  lg:w-[49px] h-11 rounded-xs font-bold text-[16px] duration-300
              `}
          >
            {page}
          </button>
        ))}
        <button
          onClick={() => setActivePage(activePage + 1)}
          data-active={activePage > 3}
          className="lg:hidden flex items-center justify-center data-[active=true]:bg-[#EBEAF814] data-[active=true]:hover:bg-[#EEE7FF5D] cursor-pointer bg-[#8E4EC6] hover:bg-[#9A5CD0] focus:bg-[#8457AA] w-[50px] h-11 rounded-xs font-bold text-[16px] duration-300"
        >
          ...
        </button>
        <button
          onClick={() => setActivePage(activePage + 1)}
          className="flex items-center justify-center bg-[#8E4EC6] hover:bg-[#9A5CD0] focus:bg-[#8457AA] cursor-pointer w-16 h-11 rounded-xs"
        >
          <ArrowRightIcon />
        </button>
      </div>
    </div>
  );
}
