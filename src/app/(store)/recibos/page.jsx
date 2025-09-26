import { ListTitle } from '@/components/lists/lists';
import SearchInput from '@/components/actiontools/SearchInput';
import { ListFilter } from '@/components/actiontools/ListFilter';
import Receipts from '@/components/lists/Receipts';

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
