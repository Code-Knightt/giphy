import { LIMIT } from "./constants";

export async function getSearchResults(query: string) {
  const data = await fetch(
    `https://api.giphy.com/v1/gifs/search?api_key=${process.env.NEXT_PUBLIC_API_KEY}&q=${query}&limit=${LIMIT}`
  ).then((res) => res.json());
  return data;
}

export async function getTrending() {
  const data = await fetch(
    `https://api.giphy.com/v1/gifs/trending?api_key=${process.env.NEXT_PUBLIC_API_KEY}&limit=${LIMIT}`
  ).then((res) => res.json());
  return data;
}
