import ActionTools from "@/app/ui/actiontools/ActionTools";
import Orders from "@/app/ui/lists/Orders";
import { Pagination } from "@/app/ui/lists/pagination";
import { getOrdersPages } from "@/app/lib/data";

export default async function Page(props) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await getOrdersPages(query);

  return (
    <>
      <ActionTools />
      <Orders query={query} currentPage={currentPage} />
      <Pagination totalPages={totalPages} />
    </>
  );
};