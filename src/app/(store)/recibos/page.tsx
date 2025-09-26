import { ListTitle } from '@/components/lists/lists';
import SearchInput from '@/components/actiontools/search-input';
import { ListFilter } from '@/components/actiontools/list-filter';
import Receipts from '@/components/lists/receipts';

export const metadata = {
  title: 'Recibos',
};

export default async function Page(props) {
  const searchParams = await props.searchParams;

  return (
    <>
      <ListTitle title="Recibos" />
      <SearchInput allowNew={false} showState={false} />
      <ListFilter searchParams={searchParams} />
      <Receipts searchParams={searchParams} />
    </>
  );
}
