import Expenses from "@/app/ui/lists/Expenses";

export const metadata = {
  title: 'Gastos'
}

export default async function Page(props) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <Expenses query={query} currentPage={currentPage} />
  );
};