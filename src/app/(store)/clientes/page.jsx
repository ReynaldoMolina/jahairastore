import Clients from "@/app/ui/lists/Clients";
import NewRegister from "@/app/ui/actiontools/NewRegister";

export const metadata = {
  title: 'Clientes'
}

export default async function Page(props) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <>
      <Clients query={query} currentPage={currentPage} />
      <NewRegister />
    </>
  );
};