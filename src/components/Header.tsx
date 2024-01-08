import Link from "next/link";
import SignOutButton from "./SignOutButton";
import { cookies } from "next/headers";

export default function Header() {
  const user = cookies().get("user");

  return (
    <div className="w-full flex flex-row justify-between items-center h-20 px-2">
      <Link href="/" className="text-3xl font-black tracking-wider">
        GIPHY
      </Link>
      <div className="flex items-center gap-4">
        <Link
          href={"/favorites"}
          className={`cursor-pointer ${
            !user && "opacity-40 pointer-events-none"
          }`}
        >
          Favorites
        </Link>
        {user ? (
          <SignOutButton />
        ) : (
          <Link href={"/auth/sign-in"} className="cursor-pointer">
            Sign In
          </Link>
        )}
      </div>
    </div>
  );
}
