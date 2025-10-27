import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import { Outlet } from "react-router-dom";
import { useThemeStore } from "../zustand/themeStore";
import Header from "../components/header";
import Footer from "../components/footer";
import background from "../assets/background-image.png";
import useSizeScreen from "../hooks/useSizeScreen";
export default function RootLayout() {
  const { theme } = useThemeStore();
  const { width } = useSizeScreen();
  return (
    <Theme appearance={theme} accentColor="crimson" grayColor="sand" radius="large" scaling="95%" className="bg-black">
      <div data-theme={theme} className=" z-10 relative min-h-screen max-w-screen bg-[#121113] data-[theme='light']:bg-[#BCBAC7]">
        <div
          className="h-[500px] -top-2.5 md:top-20 absolute inset-0 bg-cover bg-center bg-no-repeat opacity-46 z-0"
          style={{
            backgroundImage: `linear-gradient(rgba(18,17,19,1), rgba(18,17,19,0.46), rgba(18,17,19,1)), url(${background})`,
            backgroundSize: width > 700 ? "120%" : "300px",
          }}
        ></div>
        <div className="relative z-10 flex flex-col min-h-screen">
          <Header />
          <main data-theme={theme} className="flex items-center justify-center flex-1 data-[theme='light']:bg-[#BCBAC7]">
            <Outlet />
          </main>
          <Footer />
        </div>
      </div>
    </Theme>
  );
}
