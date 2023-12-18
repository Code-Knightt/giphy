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
import { getSearchResults, getTrending } from "@/lib/requests";

const SearchContext = createContext<string>("");
const SearchDispatchContext = createContext<Dispatch<string> | null>(null);
const PageContext = createContext<number>(1);
const PageDispatchContext = createContext<Dispatch<number> | null>(null);
const MaxPageContext = createContext<number>(1);

export const useSearch = () => {
  return useContext(SearchContext);
};

export const useSearchDispatch = () => {
  return useContext(SearchDispatchContext);
};

export const usePage = () => {
  return useContext(PageContext);
};

export const usePageDispatch = () => {
  return useContext(PageDispatchContext);
};

export const useMaxPage = () => {
  return useContext(MaxPageContext);
};

export default function SearchProvider({ children }: React.PropsWithChildren) {
  const params = useSearchParams();
  const router = useRouter();
  const [query, setQuery] = useState<string>(params.get("q") || "");
  const [page, setPage] = useState<number>(Number(params.get("page")) || 1);
  const [maxPage, setMaxPage] = useState<number>(1);

  const setGifs = useGifDispatch();

  //Hot reloading
  useEffect(() => {
    const timeout = setTimeout(async () => {
      const urlParams = new URLSearchParams(params);
      urlParams.set("q", query);
      urlParams.set("page", String(page));
      router.replace(`/?${urlParams.toString()}`);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [query, params, router, page]);

  useEffect(() => {
    const timeout = setTimeout(async () => {
      let data = [];
      if (query.trim().length === 0) {
        data = await getTrending(page, setMaxPage);
      } else {
        data = await getSearchResults(query, page, setMaxPage);
      }

      if (setGifs) setGifs(data.data);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [query, page]);

  useEffect(() => {
    setPage(1);
  }, [query]);

  return (
    <SearchContext.Provider value={query}>
      <SearchDispatchContext.Provider value={setQuery}>
        <PageContext.Provider value={page}>
          <PageDispatchContext.Provider value={setPage}>
            <MaxPageContext.Provider value={maxPage}>
              {children}
            </MaxPageContext.Provider>
          </PageDispatchContext.Provider>
        </PageContext.Provider>
      </SearchDispatchContext.Provider>
    </SearchContext.Provider>
  );
}
