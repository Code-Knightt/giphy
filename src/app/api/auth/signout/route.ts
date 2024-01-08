import { app } from "@/lib/firebase";
import { getAuth, signOut } from "firebase/auth";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  await signOut(getAuth(app));
  cookies().delete("user");
  return NextResponse.json({ status: 200 });
}
