import ActionTools from "@/app/ui/actiontools/ActionTools";
import Categories from "@/app/ui/lists/Categories";

export const metadata = {
  title: 'Categorías'
}

export default async function Page(props) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <>
      <ActionTools />
      <Categories query={query} currentPage={currentPage} />
    </>
  );
};