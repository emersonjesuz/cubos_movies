import { useThemeStore } from "../../zustand/themeStore";

export default function Footer() {
  const { theme } = useThemeStore();
  return (
    <footer className="flex items-center justify-center h-[68px] border-t border-t-[#2B292D] p-5">
      <p data-theme={theme} className="text-[#B5B2BC] text-[16px] text-center data-[theme='light']:text-neutral-500">
        2025 © Todos os direitos reservados a <span className="font-semibold">Cubos Movies</span>
      </p>
    </footer>
  );
}
