import ActionTools from "@/app/ui/actiontools/ActionTools";
import Receipts from "@/app/ui/lists/Receipts";
import { Pagination } from "@/app/ui/lists/pagination";
import { getReceiptsPages } from "@/app/lib/data";

export default async function Page(props) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await getReceiptsPages(query);

  return (
    <>
      <ActionTools allowNew={false} />
      <Receipts query={query} currentPage={currentPage} />
      <Pagination totalPages={totalPages} />
    </>
  );
};