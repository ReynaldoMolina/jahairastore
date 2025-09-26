import { ListTitle } from '@/app/ui/lists/lists';
import SearchInput from '@/app/ui/actiontools/SearchInput';
import { ListFilter } from '@/app/ui/actiontools/ListFilter';
import Orders from '@/app/ui/lists/Orders';

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
