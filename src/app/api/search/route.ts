import { LIMIT } from "@/lib/constants";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(Request: NextRequest) {
  const { page, query } = await Request.json();
  const prisma = new PrismaClient();

  const data = await fetch(
    `https://api.giphy.com/v1/gifs/search?api_key=${
      process.env.API_KEY
    }&q=${query}&limit=${LIMIT}&offset=${LIMIT * (page - 1)}`
  ).then((res) => res.json());

  if (page === 1) {
    await prisma.search.upsert({
      where: {
        keyword: query,
      },
      create: {
        keyword: query,
        timestamp: [new Date()],
      },
      update: {
        timestamp: {
          push: new Date(),
        },
      },
    });
  }

  await prisma.$disconnect();
  return NextResponse.json(data, { status: 200 });
}
