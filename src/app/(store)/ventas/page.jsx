import NewRegister from "@/app/ui/actiontools/NewRegister";
import Sales from "@/app/ui/lists/Sales";

export const metadata = {
  title: 'Ventas'
}

export default async function Page(props) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <>
      <Sales query={query} currentPage={currentPage} />
      <NewRegister />
    </>
  );
};