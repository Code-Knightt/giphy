import { LIMIT } from "@/lib/constants";
import { NextRequest, NextResponse } from "next/server";

export async function POST(Request: NextRequest) {
  const body = await Request.json();
  const page = body.page;

  const data = await fetch(
    `https://api.giphy.com/v1/gifs/trending?api_key=${
      process.env.API_KEY
    }&limit=${LIMIT}&offset=${LIMIT * (page - 1)}`
  ).then((res) => res.json());

  return NextResponse.json(data, { status: 200 });
}
