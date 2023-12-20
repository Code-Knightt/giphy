"use server";
import { LIMIT } from "./constants";

export async function getSearchResults(query: string, page: number = 0) {
  const data = await fetch(
    `https://api.giphy.com/v1/gifs/search?api_key=${
      process.env.API_KEY
    }&q=${query}&limit=${LIMIT}&offset=${LIMIT * (page - 1)}`
  ).then((res) => res.json());

  return data;
}

export async function getTrending(page: number = 0) {
  const data = await fetch(
    `https://api.giphy.com/v1/gifs/trending?api_key=${
      process.env.API_KEY
    }&limit=${LIMIT}&offset=${LIMIT * (page - 1)}`
  ).then((res) => res.json());

  return data;
}
