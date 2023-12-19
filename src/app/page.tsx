"use client";
import GifGrid from "@/components/GifGrid";
import PaginationBar from "@/components/PaginationBar";
import SearchBar from "@/components/Searchbar";
import { useGifs } from "@/providers/GifProvider";

export default function Home() {
  const gifs = useGifs();

  return (
    <div className="min-h-screen pb-8">
      <div className="bg-white p-4 rounded-xl">
        <SearchBar />
        <GifGrid gifs={gifs} />
        <PaginationBar />
      </div>
    </div>
  );
}
