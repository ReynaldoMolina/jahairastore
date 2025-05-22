import ActionTools from "@/app/ui/ActionTools/ActionTools";
import Providers from "@/app/ui/lists/Providers";
import { Pagination } from "@/app/ui/lists/pagination";
import { getProvidersPages } from "@/app/lib/data";

export default async function Page(props) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await getProvidersPages(query);

  return (
    <>
      <ActionTools />
      <Providers query={query} currentPage={currentPage} />
      <Pagination totalPages={totalPages} />
    </>
  );
};