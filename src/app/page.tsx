"use client";
import GifGrid from "@/components/GifGrid";
import SearchBar from "@/components/Searchbar";
import { useGifs } from "@/providers/GifProvider";

export default function Home() {
  const gifs = useGifs();

  return (
    <div className="h-screen py-24">
      <div className="bg-white p-4 rounded-xl">
        <SearchBar />
        <GifGrid gifs={gifs} />
      </div>
    </div>
  );
}
