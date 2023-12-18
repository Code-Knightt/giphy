import SearchBar from "@/components/Searchbar";

export default function Home() {
  return (
    <div className="h-screen py-24">
      <div className="bg-white p-4 rounded-xl">
        <SearchBar />
      </div>
    </div>
  );
}
