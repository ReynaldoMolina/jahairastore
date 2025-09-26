import { ListTitle } from '@/components/lists/lists';
import SearchInput from '@/components/actiontools/SearchInput';
import { ListFilter } from '@/components/actiontools/ListFilter';
import Orders from '@/components/lists/Orders';

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
