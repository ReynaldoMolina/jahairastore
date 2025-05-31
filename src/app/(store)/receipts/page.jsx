import ActionTools from "@/app/ui/actiontools/ActionTools";
import Receipts from "@/app/ui/lists/Receipts";

export const metadata = {
  title: 'Recibos'
}

export default async function Page(props) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <>
      <ActionTools allowNew={false} />
      <Receipts query={query} currentPage={currentPage} />
    </>
  );
};