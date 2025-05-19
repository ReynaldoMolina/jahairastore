import ActionTools from "@/app/ui/ActionTools/ActionTools";
import WebsiteProducts from "@/app/ui/lists/WebsiteProducts";
import { Pagination } from "@/app/ui/lists/pagination";
import { getWebsiteProductsPages } from "@/app/lib/data";

export default async function Page(props) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await getWebsiteProductsPages(query);

  return (
    <>
      <ActionTools />
      <WebsiteProducts query={query} currentPage={currentPage} />
      <Pagination totalPages={totalPages} />
    </>
  );
};