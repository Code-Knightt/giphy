import { GIF } from "@/interfaces/gif.interface";
import { FaRegStar } from "react-icons/fa6";

interface TileProps {
  gif: GIF;
  hasUser: boolean;
}

export default function Tile({ gif, hasUser }: TileProps) {
  const title = gif.title.split("GIF")[0].trim();

  return (
    <div
      className={`w-full flex flex-col rounded-lg relative ${
        gif.orientation === "vertical" ? "aspect-square" : "aspect-video"
      }`}
    >
      <iframe
        src={gif.url}
        width="100%"
        height="100%"
        className="rounded-lg"
      ></iframe>

      <div className=" top-full w-full flex flex-row justify-between items-center p-2 rounded-lg">
        <div>
          <p className="text-md md:text-lg text-black font-bold">{title}</p>
          {gif.username && (
            <p className="text-sm text-gray-400 md:text-md font-light">
              @{gif.username}
            </p>
          )}
        </div>
        {hasUser && (
          <FaRegStar
            size="1.5em"
            color="gold"
            className="cursor-pointer hover:scale-125 transition-all "
          />
        )}
      </div>
    </div>
  );
}
