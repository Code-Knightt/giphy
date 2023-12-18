"use client";
import { useSearch, useSearchDispatch } from "@/providers/SearchProvider";
import Link from "next/link";
import { FaMagnifyingGlass } from "react-icons/fa6";

export default function SearchBar() {
  const setSearch = useSearchDispatch();
  const search = useSearch();

  return (
    <div className="flex flex-row justify-between items-stretch gap-3">
      <div className="bg-gray-200 p-4 rounded-xl flex-1 flex flex-row items-center gap-4">
        <FaMagnifyingGlass size={"1.5em"} />
        <input
          type="text"
          name="search_query"
          className="w-full bg-transparent text-black text-lg font-semibold outline-none"
          placeholder="Article name of keywords"
          value={search}
          onChange={(e) => {
            if (setSearch) {
              setSearch(e.target.value);
            }
          }}
        />
      </div>
      <Link
        href={`/?q=${search}`}
        className="p-3 bg-black rounded-lg text-white flex items-center"
      >
        Search
      </Link>
    </div>
  );
}
