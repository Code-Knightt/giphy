"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import {
  Dispatch,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useGifDispatch } from "./GifProvider";
import { getSearchResults, getTrending } from "@/lib/requests";
import { LIMIT } from "@/lib/constants";

const SearchContext = createContext<string>("");
const SearchDispatchContext = createContext<Dispatch<string> | null>(null);
const PageContext = createContext<number>(1);
const PageDispatchContext = createContext<Dispatch<number> | null>(null);
const MaxPageContext = createContext<number>(1);
const LoadingContext = createContext<boolean>(false);

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

export const useLoading = () => {
  return useContext(LoadingContext);
};

export default function SearchProvider({ children }: React.PropsWithChildren) {
  const params = useSearchParams();
  const path = usePathname();
  const router = useRouter();
  const [query, setQuery] = useState<string>(params.get("q") || "");
  const [page, setPage] = useState<number>(Number(params.get("page")) || 1);
  const [maxPage, setMaxPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  const setGifs = useGifDispatch();

  //Hot reloading
  useEffect(() => {
    const timeout = setTimeout(async () => {
      if (path.split("?")[0] !== "/") {
        return;
      }

      const urlParams = new URLSearchParams(params);
      urlParams.set("q", query);
      urlParams.set("page", String(page));
      router.replace(`/?${urlParams.toString()}`);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [query, router, page]);

  // Fetch from GIPHY API when search query changes
  useEffect(() => {
    const timeout = setTimeout(async () => {
      let data = [];
      setLoading(true);
      if (query.trim().length === 0) {
        data = await getTrending(page);
      } else {
        data = await getSearchResults(query, page);
      }
      
      setMaxPage(Math.ceil(data.pagination.total_count / LIMIT));
      if (setGifs) setGifs(data.data);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [query, page]);

  // Set Pagination page to 1 when query changes
  useEffect(() => {
    setPage(1);
  }, [query]);

  return (
    <SearchContext.Provider value={query}>
      <SearchDispatchContext.Provider value={setQuery}>
        <PageContext.Provider value={page}>
          <PageDispatchContext.Provider value={setPage}>
            <MaxPageContext.Provider value={maxPage}>
              <LoadingContext.Provider value={loading}>
                {children}
              </LoadingContext.Provider>
            </MaxPageContext.Provider>
          </PageDispatchContext.Provider>
        </PageContext.Provider>
      </SearchDispatchContext.Provider>
    </SearchContext.Provider>
  );
}
