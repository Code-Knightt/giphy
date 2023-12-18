"use client";
import { GIF } from "@/interfaces/gif.interface";

import { Dispatch, createContext, useContext, useState } from "react";
const GifContext = createContext<GIF[]>([]);
const GifDispatchContext = createContext<Dispatch<GIF[]> | null>(null);

export const useGifs = () => {
  return useContext(GifContext);
};

export const useGifDispatch = () => {
  return useContext(GifDispatchContext);
};

export default function GifProvider({ children }: React.PropsWithChildren) {
  const [gifs, setGifs] = useState<GIF[]>([]);

  return (
    <GifContext.Provider value={gifs}>
      <GifDispatchContext.Provider value={setGifs}>
        {children}
      </GifDispatchContext.Provider>
    </GifContext.Provider>
  );
}
