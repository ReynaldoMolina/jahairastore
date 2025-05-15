import ActionTools from "@/app/ui/actiontools/ActionTools";
import Receipts from "@/app/ui/lists/Receipts";
import { Pagination } from "@/app/ui/lists/pagination";
import { getReceiptsPages } from "@/app/lib/data";

export default async function Page(props) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await getReceiptsPages(query);

  // const message = 'Solo se cargaron recibos agregados hoy, da click al ícono de filtro para cargar todo';

  return (
    <>
      <ActionTools allowNew="false" />
      <Receipts query={query} currentPage={currentPage} />
      <Pagination totalPages={totalPages} />
    </>
  );
};