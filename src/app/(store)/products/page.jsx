import ActionTools from "@/app/ui/ActionTools/ActionTools";
import Products from "@/app/ui/lists/Products";
import { Pagination } from "@/app/ui/lists/pagination";
import { getProductsPages } from "@/app/lib/data";

export default async function Page(props) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await getProductsPages(query);

  return (
    <>
      <ActionTools />
      <Products query={query} currentPage={currentPage} />
      <Pagination totalPages={totalPages} />
    </>
  );
};