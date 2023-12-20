import { GIF } from "@/interfaces/gif.interface";
import User from "@/interfaces/user.interface";
import FavoriteButton from "./FavoriteButton";
import { toggleFavorite } from "@/app/favorites/actions";

interface TileProps {
  gif: GIF;
  user?: User;
}

export default function Tile({ gif, user }: TileProps) {
  const title = gif.title.split("GIF")[0].trim();
  const isFavorite: boolean =
    user?.favorites.filter((g) => g.id === gif.id).length !== 0 || false;

  return (
    <div
      className={`w-full flex flex-col rounded-lg relative ${
        gif.orientation === "vertical" ? "aspect-square" : "aspect-video"
      }`}
    >
      <iframe src={gif.url} width="100%" height="100%" className="rounded-lg" />

      <div className=" top-full w-full flex flex-row justify-between items-center p-2 rounded-lg">
        <div>
          <p className="text-md md:text-lg text-black font-bold">{title}</p>
          {gif.username && (
            <p className="text-sm text-gray-400 md:text-md font-light">
              @{gif.username}
            </p>
          )}
        </div>
        {user && (
          <FavoriteButton
            user={user}
            gif={gif}
            isFavorite={isFavorite}
            toggleFavorite={toggleFavorite}
          />
        )}
      </div>
    </div>
  );
}
