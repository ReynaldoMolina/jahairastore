import { ListTitle } from '@/app/ui/lists/lists';
import SearchInput from '@/app/ui/actiontools/SearchInput';
import { ListFilter } from '@/app/ui/actiontools/ListFilter';
import Receipts from '@/app/ui/lists/Receipts';

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
