import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(Request: NextRequest) {
  const { user, isFavorite, gif } = await Request.json();
  const prisma = new PrismaClient();

  if (!user) {
    return NextResponse.json({
      type: "error",
      message: "User not found",
      status: 400,
    });
  }

  if (!isFavorite) {
    const gifDB = await prisma.gif.upsert({
      where: {
        giphyId: gif.id,
      },
      create: {
        giphyId: gif.id,
        slug: gif.slug,
        title: gif.title,
        url: gif.url,
        username: gif.username,
        orientation: gif.orientation,
      },
      update: {},
    });

    await prisma.favorite.create({
      data: {
        gifId: gifDB.id,
        userId: user.id,
      },
    });
  } else {
    await prisma.favorite.delete({
      where: {
        FavoriteUniqueId: {
          gifId: gif.id,
          userId: user.id,
        },
      },
    });
  }

  const userDB = await prisma.user.findFirst({
    where: {
      id: user.id,
    },
    include: {
      favorites: {
        include: {
          gif: true,
        },
      },
    },
  });

  if (!userDB) {
    return NextResponse.json({
      type: "error",
      message: "User not found",
      status: 404,
    });
  }

  const localUser = {
    id: user.id,
    name: user.name,
    email: user.email,
    favorites: userDB.favorites.map((fav) => fav.gif),
  };

  cookies().set("user", JSON.stringify(localUser));
  await prisma.$disconnect();

  return NextResponse.json({
    type: "success",
    message: "Favorite Toggled",
    status: 200,
  });
}
