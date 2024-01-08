"use client";
import { GIF } from "@/interfaces/gif.interface";
import User from "@/interfaces/user.interface";
import { useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa6";

interface FavoriteButtonProps {
  user: User;
  gif: GIF;
  isFavorite: boolean;
  toggleFavorite: (isFavorite: boolean, user: User, gif: GIF) => Promise<void>;
}

export default function FavoriteButton({
  user,
  gif,
  isFavorite,
  toggleFavorite,
}: FavoriteButtonProps) {
  const [favoriteState, setFavoriteState] = useState(isFavorite);

  const handleFavoriteToggle = async () => {
    const data = await fetch("/api/favorites", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user,
        gif,
        isFavorite,
      }),
    }).then((res) => res.json());

    setFavoriteState(!favoriteState);
  };

  return (
    <div onClick={handleFavoriteToggle}>
      {favoriteState ? (
        <FaStar
          size="1.5em"
          color="gold"
          className="cursor-pointer hover:scale-125 transition-all"
        />
      ) : (
        <FaRegStar
          size="1.5em"
          color="gold"
          className="cursor-pointer hover:scale-125 transition-all "
        />
      )}
    </div>
  );
}
