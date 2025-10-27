import { useMovieStore } from "../../zustand/moviesStore";

export default function Trailer() {
  const { movie } = useMovieStore();

  function getEmbedUrl(url: string): string {
    if (!url) return "";
    const videoIdMatch = url.match(/(?:v=|\/)([0-9A-Za-z_-]{11})/);
    const videoId = videoIdMatch ? videoIdMatch[1] : null;
    return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
  }

  const embedUrl = getEmbedUrl(movie.urlTrailer);

  return (
    <div className="flex flex-col gap-4 w-full h-[414px] lg:h-[601px] lg:pt-2">
      <h1 className="font-bold text-[24px]">Trailer</h1>
      <div className="w-full flex-1 lg:h-full">
        {embedUrl ? (
          <iframe
            className="w-full h-full"
            src={embedUrl}
            title="Trailer"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : (
          <p className="text-gray-400 text-center">Trailer não disponível</p>
        )}
      </div>
    </div>
  );
}
