import NewRegister from "@/app/ui/actiontools/NewRegister";
import SearchInput from "@/app/ui/actiontools/SearchInput";
import Purchases from "@/app/ui/lists/Purchases";

export const metadata = {
  title: 'Compras'
}

export default async function Page(props) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <>
      <SearchInput />
      <Purchases query={query} currentPage={currentPage} />
      <NewRegister />
    </>
  );
};