"use server";
import { GIF } from "@/interfaces/gif.interface";
import User from "@/interfaces/user.interface";
import { db } from "@/lib/firebase";

import {
  doc,
  updateDoc,
  arrayRemove,
  arrayUnion,
  getDoc,
} from "firebase/firestore";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function toggleFavorite(
  isFavorite: boolean,
  user: User,
  gif: GIF
) {
  if (!user) {
    return;
  }

  const document = doc(db, "users", user.email);

  await updateDoc(document, {
    favorites: isFavorite === false ? arrayUnion(gif) : arrayRemove(gif),
  });

  let favorites = await (
    await getDoc(doc(db, "users", user.email))
  ).get("favorites");

  if (isFavorite) {
    const index = favorites.findIndex((fav: GIF) => fav.url === gif.url);
    if (index > -1) {
      favorites.splice(index, 1);
    }
  }

  cookies().set("user", JSON.stringify({ ...user, favorites }));
  revalidatePath("/");
}
