import { ListFilter } from '@/components/actiontools/list-filter';
import SearchInput from '@/components/actiontools/search-input';
import { ListTitle } from '@/components/lists/lists';
import Orders from '@/components/lists/orders';

export const metadata = {
  title: 'Pedidos',
};

export default async function Page(props) {
  const searchParams = await props.searchParams;

  return (
    <>
      <ListTitle title="Pedidos" />
      <SearchInput />
      <ListFilter showState={true} searchParams={searchParams} />
      <Orders searchParams={searchParams} />
    </>
  );
}
