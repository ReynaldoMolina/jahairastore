import { ListTitle } from '@/components/lists/lists';
import SearchInput from '@/components/actiontools/search-input';
import { ListFilter } from '@/components/actiontools/list-filter';
import Orders from '@/components/lists/orders';

export const metadata = {
  title: 'Pedidos',
};

export default async function Page(props) {
  const searchParams = await props.searchParams;

  return (
    <>
      <ListTitle title="Pedidos" />
      <SearchInput showState={true} />
      <ListFilter showState={true} searchParams={searchParams} />
      <Orders searchParams={searchParams} />
    </>
  );
}
