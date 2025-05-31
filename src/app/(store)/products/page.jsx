import ActionTools from "@/app/ui/actiontools/ActionTools";
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
      <ActionTools />
      <Products query={query} currentPage={currentPage} />
    </>
  );
};