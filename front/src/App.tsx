import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import Footer from "./components/footer";
import Header from "./components/header";
import Login from "./pages/login";
import { useThemeStore } from "./zustand/themeStore";

export default function App() {
  const { theme } = useThemeStore();
  return (
    <Theme appearance={theme} accentColor="crimson" grayColor="sand" radius="large" scaling="95%">
      <div
        data-theme={theme}
        className="relative h-screen min-h-screen w-screen bg-[rgba(241, 230, 253, 0.19)] data-[theme='light']:bg-[#FDFCFD]"
      >
        <div
          className="absolute inset-0 bg-cover bg-center opacity-[0.46]"
          style={{
            backgroundImage: `linear-gradient(rgba(18, 17, 19, 1), rgba(18, 17, 19, 0.46), rgba(18, 17, 19, 1)), url('/src/assets/background-image.png')`,
          }}
        ></div>

        <div className="relative z-10 grid grid-cols-1 grid-rows-[auto_1fr_auto] h-full">
          <Header />
          <Login />
          <Footer />
        </div>
      </div>
    </Theme>
  );
}
