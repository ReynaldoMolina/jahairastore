import ActionTools from "@/app/ui/ActionTools/ActionTools";
import Categories from "@/app/ui/lists/Categories";
import { Pagination } from "@/app/ui/lists/pagination";
import { getCategoriesPages } from "@/app/lib/data";

export default async function Page(props) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await getCategoriesPages(query);

  return (
    <>
      <ActionTools />
      <Categories query={query} currentPage={currentPage} />
      <Pagination totalPages={totalPages} />
    </>
  );
};