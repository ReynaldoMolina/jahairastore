import SearchInput from '@/app/ui/actiontools/SearchInput';
import { ListTitle } from '@/app/ui/lists/lists';
import Sales from '@/app/ui/lists/Sales';

export const metadata = {
  title: 'Ventas',
};

export default async function Page(props) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <>
      <ListTitle title="Ventas" />
      <SearchInput />
      <Sales query={query} currentPage={currentPage} />
    </>
  );
}
