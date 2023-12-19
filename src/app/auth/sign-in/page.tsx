import User from "@/interfaces/user.interface";
import { app, db } from "@/lib/firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

import Link from "next/link";
import { redirect } from "next/navigation";

async function handleSignIn(formdata: FormData) {
  "use server";
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
  } catch (e) {
    console.log(e);
  }
  revalidatePath("/", "layout");
  redirect("/");
}

export default async function SignIn() {
  return (
    <form className="flex flex-col gap-2" action={handleSignIn}>
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-bold text-2xl">Sign In</h1>
      </div>
      <input
        type="email"
        name="email"
        placeholder="Email"
        className="rounded-md p-2 outline outline-gray-200 focus:outline-black outline-1  focus:outline-2 mb-2"
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        className="rounded-md p-2 outline outline-gray-200 focus:outline-black outline-1  focus:outline-2 mb-2"
      />
      <button type="submit" className="bg-black text-white rounded-lg p-2 mb-2">
        Sign In
      </button>
      <hr className="my-3" />
      <Link href={"/auth/sign-up"} className="m-auto text-gray-400">
        Sign Up
      </Link>
    </form>
  );
}
