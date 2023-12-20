"use server";

export type FormState = {
  message: string;
  error: boolean;
};

import User from "@/interfaces/user.interface";
import { app, db } from "@/lib/firebase";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function handleSignIn(
  prevState: FormState,
  formdata: FormData
): Promise<FormState> {
  try {
    const email = formdata.get("email")!.toString();
    const password = formdata.get("password")!.toString();

    const auth = getAuth(app);
    await signInWithEmailAndPassword(auth, email, password);
    const user = await getDoc(doc(db, "users", email));
    const localUser: User = {
      name: user.get("name"),
      email: email,
      favorites: user.get("favorites"),
    };

    cookies().set("user", JSON.stringify(localUser));
  } catch (e: any) {
    return {
      message: e.message || "Something went wrong",
      error: true,
    } as FormState;
  }
  revalidatePath("/", "layout");
  redirect("/");
}

export async function handleSignUp(
  prevState: FormState,
  formdata: FormData
): Promise<FormState> {
  if (formdata.get("confirm") !== formdata.get("password")) {
    return {
      message: "Passwords do not match",
      error: true,
    } as FormState;
  }
  try {
    const name = formdata.get("name")!.toString();
    const email = formdata.get("email")!.toString();
    const password = formdata.get("password")!.toString();

    const auth = getAuth(app);
    await createUserWithEmailAndPassword(auth, email, password);

    const localUser: User = {
      name: name,
      email: email,
      favorites: [],
    };
    await setDoc(doc(db, "users", localUser.email), localUser);
    cookies().set("user", JSON.stringify(localUser));
  } catch (e: any) {
    return {
      message: e.message || "Something went wrong",
      error: true,
    } as FormState;
  }
  revalidatePath("/");
  redirect("/");
}
