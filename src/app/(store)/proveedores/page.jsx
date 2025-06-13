import NewRegister from "@/app/ui/actiontools/NewRegister";
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
      <Providers query={query} currentPage={currentPage} />
      <NewRegister />
    </>
  );
};