import { ListFilter } from '@/components/action-bar/list-filter';
import SearchInput from '@/components/action-bar/search-input';
import { ListTitle } from '@/components/lists/lists';
import Purchases from '@/components/lists/purchases';

export const metadata = {
  title: 'Compras',
};

export default async function Page(props) {
  const searchParams = await props.searchParams;

  return (
    <>
      <ListTitle title="Compras" />
      <SearchInput />
      <ListFilter searchParams={searchParams} />
      <Purchases searchParams={searchParams} />
    </>
  );
}
