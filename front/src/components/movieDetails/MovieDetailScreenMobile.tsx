import ButtonsSection from "./buttonsSection";
import CoverImage from "./coverImage";
import InfoMovieSection from "./infoMovieSection";
import RatingAndVotesSection from "./ratingAndVotesSection";
import SynopsisDescriptionAndGenresSection from "./synopsisDescriptionAndGenresSection";
import TitlesSection from "./titlesSection";
import Trailer from "./trailer";

export default function MovieDetailScreenMobile() {
  return (
    <div className="relative lg:hidden flex flex-col lg:flex-row items-center lg:items-start font-montserrat p-4 bg-no-repeat bg-cover bg-center lg:p-8">
      <CoverImage />
      <div className="flex flex-col gap-4 max-w-[600px]">
        <ButtonsSection />
        <TitlesSection className="lg:hidden flex items-center justify-center flex-col w-full font-montserrat" />
        <RatingAndVotesSection />
        <SynopsisDescriptionAndGenresSection />
        <InfoMovieSection />
        <Trailer />
      </div>
    </div>
  );
}
