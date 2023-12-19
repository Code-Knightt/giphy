import Link from "next/link";

export default function Header() {
  return (
    <div className="w-full flex flex-row justify-between items-center h-20 px-2">
      <Link href="/" className="text-3xl font-black tracking-wider">
        GIPHY
      </Link>
      <div className="flex gap-4 cursor-pointer">
        <p>Favorites</p>
        <Link href={"/auth/sign-in"}>Sign In</Link>
      </div>
    </div>
  );
}
