import { ListTitle } from '@/components/lists/lists';
import SearchInput from '@/components/action-bar/search-input';
import { ListFilter } from '@/components/action-bar/filter-button';
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
