import { useMovieStore } from "../../zustand/moviesStore";
import ButtonsSection from "./buttonsSection";
import CoverImage from "./coverImage";
import InfoMovieSection from "./infoMovieSection";
import RatingAndVotesSection from "./ratingAndVotesSection";
import SynopsisDescriptionAndGenresSection from "./synopsisDescriptionAndGenresSection";
import TitlesSection from "./titlesSection";
import Trailer from "./trailer";

export default function MovieDetailScreenDesktop() {
  const { movie } = useMovieStore();
  return (
    <div className="relative lg:flex hidden flex-col font-montserrat gap-4 bg-no-repeat bg-cover bg-center w-full p-8">
      <div className="flex gap-4 justify-between">
        <TitlesSection className="flex justify-center flex-col w-full font-montserrat" />
        <ButtonsSection />
      </div>
      <div className="flex gap-4 ">
        <div className="min-w-[374px]">
          <CoverImage />
        </div>
        <div className="flex flex-col gap-4 w-full">
          <div className="w-full h-[98px] flex flex-wrap justify-between items-center">
            <div className="w-[300px] truncate">
              <p className="italic text-[16px] pl-4 ">{movie.description}</p>
            </div>
            <RatingAndVotesSection />
          </div>
          <div className="flex justify-between gap-4 h-full w-full">
            <SynopsisDescriptionAndGenresSection />
            <InfoMovieSection />
          </div>
        </div>
      </div>
      <Trailer />
    </div>
  );
}
