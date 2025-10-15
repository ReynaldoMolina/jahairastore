import { ListFilter } from '@/components/actiontools/list-filter';
import SearchInput from '@/components/actiontools/search-input';
import { ListTitle } from '@/components/lists/lists';
import Receipts from '@/components/lists/receipts';

export const metadata = {
  title: 'Recibos',
};

export default async function Page(props) {
  const searchParams = await props.searchParams;

  return (
    <>
      <ListTitle title="Recibos" />
      <SearchInput allowNew={false} />
      <ListFilter searchParams={searchParams} />
      <Receipts searchParams={searchParams} />
    </>
  );
}
