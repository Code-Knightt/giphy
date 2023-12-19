import User from "@/interfaces/user.interface";
import { app, db } from "@/lib/firebase";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

async function handleSignUp(formdata: FormData) {
  "use server";

  if (formdata.get("confirm") !== formdata.get("password")) {
    return;
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
  } catch (e) {
    console.log(e);
  }
  revalidatePath("/");
  redirect("/");
}

export default async function SignUp() {
  return (
    <form className="flex flex-col gap-2" action={handleSignUp}>
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-bold text-2xl">Sign Up</h1>
      </div>
      <input
        type="text"
        name="name"
        placeholder="Name"
        required
        className="rounded-md p-2 outline outline-gray-200 focus:outline-black outline-1  focus:outline-2 mb-2"
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        required
        className="rounded-md p-2 outline outline-gray-200 focus:outline-black outline-1  focus:outline-2 mb-2"
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        required
        className="rounded-md p-2 outline outline-gray-200 focus:outline-black outline-1  focus:outline-2 mb-2"
      />
      <input
        type="password"
        name="confirm"
        placeholder="Confirm Password"
        required
        className="rounded-md p-2 outline outline-gray-200 focus:outline-black outline-1  focus:outline-2 mb-2"
      />
      <button type="submit" className="bg-black text-white rounded-lg p-2 mb-2">
        Sign Up
      </button>
      <hr className="my-3" />
      <Link href={"/auth/sign-in"} className="m-auto text-gray-400">
        Sign In
      </Link>
    </form>
  );
}
