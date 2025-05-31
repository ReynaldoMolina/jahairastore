import ActionTools from "@/app/ui/actiontools/ActionTools";
import Clients from "@/app/ui/lists/Clients";

export const metadata = {
  title: 'Clientes'
}

export default async function Page(props) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <>
      <ActionTools />
      <Clients query={query} currentPage={currentPage} />
    </>
  );
};