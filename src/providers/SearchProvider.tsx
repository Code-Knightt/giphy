"use client";
import { useRouter, useSearchParams } from "next/navigation";

import {
  Dispatch,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useGifDispatch } from "./GifProvider";
import { LIMIT } from "@/lib/constants";

const SearchContext = createContext<string>("");
const SearchDispatchContext = createContext<Dispatch<string> | null>(null);

export const useSearch = () => {
  return useContext(SearchContext);
};

export const useSearchDispatch = () => {
  return useContext(SearchDispatchContext);
};

async function getSearchResults(query: string) {
  const data = await fetch(
    `https://api.giphy.com/v1/gifs/search?api_key=${process.env.NEXT_PUBLIC_API_KEY}&q=${query}&limit=${LIMIT}`
  ).then((res) => res.json());
  return data;
}

async function getTrending() {
  const data = await fetch(
    `https://api.giphy.com/v1/gifs/trending?api_key=${process.env.NEXT_PUBLIC_API_KEY}&limit=${LIMIT}`
  ).then((res) => res.json());
  return data;
}

export default function SearchProvider({ children }: React.PropsWithChildren) {
  const params = useSearchParams();
  const router = useRouter();
  const [query, setQuery] = useState<string>(params.get("q") || "");

  const setGifs = useGifDispatch();

  //Hot reloading
  useEffect(() => {
    const timeout = setTimeout(async () => {
      const urlParams = new URLSearchParams(params);
      urlParams.set("q", query);
      router.replace(`/?${urlParams.toString()}`);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [query, params, router]);

  useEffect(() => {
    const timeout = setTimeout(async () => {
      let data = [];
      if (query.trim().length === 0) {
        data = await getTrending();
      } else {
        data = await getSearchResults(query);
      }

      if (setGifs) setGifs(data.data);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [query]);

  return (
    <SearchContext.Provider value={query}>
      <SearchDispatchContext.Provider value={setQuery}>
        {children}
      </SearchDispatchContext.Provider>
    </SearchContext.Provider>
  );
}
