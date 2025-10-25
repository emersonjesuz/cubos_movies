import { useThemeStore } from "../../zustand/themeStore";
import LogoCubosDesktop from "../icons/LogoCubosDesktop";
import LogoCubosMobile from "../icons/LogoCubosMobile";
import SunIcon from "../icons/SunIcon";

export default function Header() {
  const { theme, toggleTheme } = useThemeStore();
  return (
    <header
      data-theme={theme}
      className="flex items-center justify-between h-[72px] p-4 border-b border-b-[#F1E6FD30] data-[theme='light']:border-b-[#7C7A85]"
    >
      <div className="flex gap-4 items-center">
        <LogoCubosMobile data-theme={theme} className="md:hidden w-[35.64px] h-[34.63px]" />
        <LogoCubosDesktop data-theme={theme} className="md:block hidden w-40 h-9" />

        <h1 className="text-[20px] font-bold text-center text-[#EEEEF0]">Movies</h1>
      </div>
      <div className="flex items-center gap-4">
        <button
          data-theme={theme}
          onClick={toggleTheme}
          className="flex items-center justify-center bg-[#B744F714] hover:bg-[#9A5CD0] cursor-pointer duration-300 data-[theme='light']:bg-[#402060] data-[theme='light']:hover:bg-[#8145B5] w-16 h-11 rounded-xs"
        >
          <SunIcon />
        </button>
        <button
          data-theme={theme}
          className="flex items-center justify-center bg-[#8E4EC6] hover:bg-[#C150FF2E] cursor-pointer duration-300 data-[theme='light']:bg-[#8347B9] data-[theme='light']:hover:bg-[#250049DF] w-[90px] h-11 rounded-xs text-white text-md"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
