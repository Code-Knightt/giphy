import { app } from "@/lib/firebase";
import { PrismaClient } from "@prisma/client";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(Request: NextRequest) {
  try {
    const body = await Request.json();
    const email = body.email;
    const password = body.password;

    const prisma = new PrismaClient();
    const auth = getAuth(app);
    await signInWithEmailAndPassword(auth, email, password);

    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
      include: {
        favorites: {
          include: {
            gif: true,
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json({
        type: "error",
        message: "User not found",
        status: 404,
      });
    }

    await prisma.login.create({
      data: {
        userId: user.id,
      },
    });

    const localUser = {
      id: user.id,
      name: user.name,
      email: email,
      favorites: user.favorites.map((fav) => fav.gif),
    };

    cookies().set("user", JSON.stringify(localUser));
    await prisma.$disconnect();
  } catch (e: any) {
    return NextResponse.json({
      type: "error",
      message: `Something went wrong: ${e.message}`,
      status: 400,
    });
  }

  return NextResponse.json({
    type: "success",
    message: "Signed In Successfully",
    status: 200,
  });
}
