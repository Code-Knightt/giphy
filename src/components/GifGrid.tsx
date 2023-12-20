"use client";
import { GIF } from "@/interfaces/gif.interface";
import Tile from "./Tile";
import { useLoading } from "@/providers/SearchProvider";
import Loader from "./Loader";
import User from "@/interfaces/user.interface";
import { useEffect, useState } from "react";

interface GifGridProps {
  gifs: GIF[];
}

export default function GifGrid({ gifs }: GifGridProps) {
  const isLoading = useLoading();
  const [user, setUser] = useState<User | null>();

  useEffect(() => {
    const temp = document.cookie
      .split(";")
      .filter((el) => el.trim().startsWith("user"))[0];

    if (temp) {
      setUser(JSON.parse(decodeURIComponent(temp.split("=")[1])));
    }
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="grid grid-cols-1 my-4 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-3">
      {gifs.map((gif: any) => {
        const shortGif: GIF = {
          id: gif.id,
          url: gif.embed_url || gif.url,
          title: gif.title,
          username: gif.username,
          slug: gif.slug,
          orientation: gif.orientation
            ? gif.orientation
            : gif.images.original.width - gif.images.original.height > 40
            ? "horizontal"
            : "vertical",
        };

        return <Tile key={gif.id} gif={shortGif} user={user || undefined} />;
      })}
    </div>
  );
}
