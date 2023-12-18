import { Dispatch } from "react";
import { LIMIT } from "./constants";

export async function getSearchResults(
  query: string,
  page: number = 0,
  setMaxPage: Dispatch<number>
) {
  const data = await fetch(
    `https://api.giphy.com/v1/gifs/search?api_key=${
      process.env.NEXT_PUBLIC_API_KEY
    }&q=${query}&limit=${LIMIT}&offset=${LIMIT * (page - 1)}`
  ).then((res) => res.json());
  setMaxPage(Math.ceil(data.pagination.total_count / LIMIT));

  return data;
}

export async function getTrending(
  page: number = 0,
  setMaxPage: Dispatch<number>
) {
  const data = await fetch(
    `https://api.giphy.com/v1/gifs/trending?api_key=${
      process.env.NEXT_PUBLIC_API_KEY
    }&limit=${LIMIT}&offset=${LIMIT * (page - 1)}`
  ).then((res) => res.json());
  setMaxPage(Math.ceil(data.pagination.total_count / LIMIT));

  return data;
}
