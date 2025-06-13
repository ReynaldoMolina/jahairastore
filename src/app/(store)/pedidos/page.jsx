import NewRegister from "@/app/ui/actiontools/NewRegister";
import Orders from "@/app/ui/lists/Orders";

export const metadata = {
  title: 'Pedidos'
}

export default async function Page(props) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <>
      <Orders query={query} currentPage={currentPage} />
      <NewRegister />
    </>
  );
};