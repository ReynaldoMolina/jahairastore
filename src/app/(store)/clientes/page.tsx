import Clients from '@/components/lists/clients';
import SearchInput from '@/components/action-bar/search-input';
import { ListFilter } from '@/components/action-bar/list-filter';
import { ListTitle } from '@/components/lists/lists';

export const metadata = {
  title: 'Clientes',
};

export default async function Page(props) {
  const searchParams = await props.searchParams;

  return (
    <>
      <ListTitle title="Clientes" />
      <SearchInput />
      <ListFilter searchParams={searchParams} />
      <Clients searchParams={searchParams} />
    </>
  );
}
