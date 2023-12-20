import GifGrid from "@/components/GifGrid";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

function getFavorites() {
  const user = JSON.parse(cookies().get("user")?.value || "{}");

  if (!user || !user?.favorites) {
    return null;
  }

  if (user?.favorites?.length === 0) {
    return [];
  }
  return user.favorites;
}

export default async function FavoritesPage() {
  const gifs = getFavorites();

  if (gifs === null) {
    redirect("/");
  }

  if (gifs.length === 0) {
    return <p className="text-center text-3xl font-bold">No Favorites Yet</p>;
  }

  return (
    <div className="min-h-screen pb-8">
      <div className="bg-white p-4 rounded-xl">
        <GifGrid gifs={gifs} />
      </div>
    </div>
  );
}
