"use client";

import { useRouter, useSearchParams } from "next/navigation";

import {
  Dispatch,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
const SearchContext = createContext<string>("");
const SearchDispatchContext = createContext<Dispatch<string> | null>(null);

export const useSearch = () => {
  return useContext(SearchContext);
};

export const useSearchDispatch = () => {
  return useContext(SearchDispatchContext);
};

export default function SearchProvider({ children }: React.PropsWithChildren) {
  const params = useSearchParams();
  const router = useRouter();
  const [query, setQuery] = useState<string>(params.get("q") || "");

  //Hot reloading
  useEffect(() => {
    const timeout = setTimeout(() => {
      const urlParams = new URLSearchParams(params);
      urlParams.set("q", query);
      router.replace(`/?${urlParams.toString()}`);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [query, params, router]);

  return (
    <SearchContext.Provider value={query}>
      <SearchDispatchContext.Provider value={setQuery}>
        {children}
      </SearchDispatchContext.Provider>
    </SearchContext.Provider>
  );
}
