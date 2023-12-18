import { GIF } from "@/interfaces/gif.interface";
import Tile from "./Tile";

interface GifGridProps {
  gifs: GIF[];
}

export default function GifGrid({ gifs }: GifGridProps) {
  console.log(gifs);
  return (
    <div className="grid grid-cols-1 my-4 sm:grid-cols-2 md:grid-cols-3 gap-3">
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

        return <Tile key={gif.id} gif={shortGif} />;
      })}
    </div>
  );
}
