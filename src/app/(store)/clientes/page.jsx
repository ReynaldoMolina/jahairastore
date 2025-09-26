import Clients from '@/app/ui/lists/Clients';
import SearchInput from '@/app/ui/actiontools/SearchInput';
import { ListFilter } from '@/app/ui/actiontools/ListFilter';
import { ListTitle } from '@/app/ui/lists/lists';

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
