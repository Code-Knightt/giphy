import {
  useMaxPage,
  usePage,
  usePageDispatch,
} from "@/providers/SearchProvider";

export default function PaginationBar() {
  const currentPage = usePage();
  const totalPages = useMaxPage();

  const maxPage = Math.min(totalPages, Math.max(currentPage + 2, 5));
  const minPage = Math.max(1, Math.min(currentPage - 2, maxPage - 4));

  const setPage = usePageDispatch();

  const numberedPageItems: JSX.Element[] = [];
  for (let page = minPage; page <= maxPage; page++) {
    numberedPageItems.push(
      <div
        key={page}
        className={`text-lg cursor-pointer px-3 py-1 rounded-sm ${
          currentPage === page ? "bg-pink-200  border-b-2 border-pink-500" : ""
        }`}
        onClick={() => {
          if (setPage) setPage(page);
        }}
      >
        {page}
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-row w-full items-center justify-center gap-3">
        {numberedPageItems}
      </div>
    </>
  );
}
