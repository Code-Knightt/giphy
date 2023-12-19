import Link from "next/link";
import SignOutButton from "./SignOutButton";
import { getAuth, signOut } from "firebase/auth";
import { app } from "@/lib/firebase";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

async function handleSignOut() {
  "use server";
  await signOut(getAuth(app));
  cookies().delete("user");
  revalidatePath("/", "layout");
  redirect("/");
}

export default function Header() {
  const user = cookies().get("user");

  return (
    <div className="w-full flex flex-row justify-between items-center h-20 px-2">
      <Link href="/" className="text-3xl font-black tracking-wider">
        GIPHY
      </Link>
      <div className="flex items-center gap-4">
        <p
          className={`cursor-pointer ${
            !user && "opacity-40 pointer-events-none"
          }`}
        >
          Favorites
        </p>
        {user ? (
          <SignOutButton handleSignOut={handleSignOut} />
        ) : (
          <Link href={"/auth/sign-in"} className="cursor-pointer">
            Sign In
          </Link>
        )}
      </div>
    </div>
  );
}
