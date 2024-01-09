import { app } from "@/lib/firebase";
import { PrismaClient } from "@prisma/client";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(Request: NextRequest) {
  const body = await Request.json();

  const prisma = new PrismaClient();
  if (body.confirm !== body.password) {
    return NextResponse.json(
      {
        type: "error",
        message: "Passwords do not match",
      },
      { status: 400 }
    );
  }
  try {
    const name = body.name;
    const email = body.email;
    const password = body.password;

    const auth = getAuth(app);
    await createUserWithEmailAndPassword(auth, email, password);

    const localUser = {
      name: name,
      email: email,
      favorites: [],
    };

    const user = await prisma.user.create({
      data: {
        email,
        name,
      },
    });

    await prisma.login.create({
      data: {
        userId: user.id,
      },
    });

    cookies().set("user", JSON.stringify(localUser));
    await prisma.$disconnect();
  } catch (e: any) {
    return NextResponse.json(
      {
        type: "error",
        message: `Something went wrong: ${e.message}`,
      },
      { status: 400 }
    );
  }
  revalidatePath("/");
  return NextResponse.json(
    {
      type: "success",
      message: "User signed up successfully",
    },
    { status: 200 }
  );
}
