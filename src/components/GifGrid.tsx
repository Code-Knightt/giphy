import { GIF } from "@/interfaces/gif.interface";
import Tile from "./Tile";
import { useLoading } from "@/providers/SearchProvider";
import Loader from "./Loader";

interface GifGridProps {
  gifs: GIF[];
}

export default function GifGrid({ gifs }: GifGridProps) {
  const isLoading = useLoading();

  const user = document.cookie
    .split(";")
    .filter((el) => el.trim().startsWith("user"))[0];

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="grid grid-cols-1 my-4 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-3">
      {gifs.map((gif: any) => {
        const shortGif: GIF = {
          id: gif.id,
          url: gif.embed_url,
          title: gif.title,
          username: gif.username,
          slug: gif.slug,
          orientation:
            gif.images.original.width - gif.images.original.height > 40
              ? "horizontal"
              : "vertical",
        };

        return (
          <Tile key={gif.id} gif={shortGif} hasUser={user !== undefined} />
        );
      })}
    </div>
  );
}
