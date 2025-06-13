import NewRegister from "@/app/ui/actiontools/NewRegister";
import Products from "@/app/ui/lists/Products";

export const metadata = {
  title: 'Productos'
}

export default async function Page(props) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <>
      <Products query={query} currentPage={currentPage} />
      <NewRegister />
    </>
  );
};