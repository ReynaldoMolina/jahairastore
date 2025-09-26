import Clients from '@/components/lists/Clients';
import SearchInput from '@/components/actiontools/SearchInput';
import { ListFilter } from '@/components/actiontools/ListFilter';
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
