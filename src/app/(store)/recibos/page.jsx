import SearchInput from '@/app/ui/actiontools/SearchInput';
import { ListTitle } from '@/app/ui/lists/lists';
import Receipts from '@/app/ui/lists/Receipts';

export const metadata = {
  title: 'Recibos',
};

export default async function Page(props) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <>
      <ListTitle title="Recibos" />
      <SearchInput allowNew={false} />
      <Receipts query={query} currentPage={currentPage} />
    </>
  );
}
