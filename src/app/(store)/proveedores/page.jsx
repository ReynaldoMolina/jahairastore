import NewRegister from "@/app/ui/actiontools/NewRegister";
import SearchInput from "@/app/ui/actiontools/SearchInput";
import Providers from "@/app/ui/lists/Providers";

export const metadata = {
  title: 'Proveedores'
}

export default async function Page(props) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <>
      <SearchInput />
      <Providers query={query} currentPage={currentPage} />
      <NewRegister />
    </>
  );
};