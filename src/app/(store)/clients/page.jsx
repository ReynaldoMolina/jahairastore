import ActionTools from "@/app/ui/ActionTools/ActionTools";
import Clients from "@/app/ui/lists/Clients";
import { Pagination } from "@/app/ui/lists/pagination";
import { getClientsPages } from "@/app/lib/data";

export default async function Page(props) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await getClientsPages(query);

  return (
    <>
      <ActionTools />
      <Clients query={query} currentPage={currentPage} />
      <Pagination totalPages={totalPages} />
    </>
  );
};