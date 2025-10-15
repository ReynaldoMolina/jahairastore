import { ListFilter } from '@/components/actiontools/list-filter';
import SearchInput from '@/components/actiontools/search-input';
import Clients from '@/components/lists/clients';
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
