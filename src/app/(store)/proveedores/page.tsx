import { ListFilter } from '@/components/action-bar/list-filter';
import SearchInput from '@/components/action-bar/search-input';
import { ListTitle } from '@/components/lists/lists';
import Providers from '@/components/lists/providers';

export const metadata = {
  title: 'Proveedores',
};

export default async function Page(props) {
  const searchParams = await props.searchParams;

  return (
    <>
      <ListTitle title="Proveedores" />
      <SearchInput />
      <ListFilter searchParams={searchParams} />
      <Providers searchParams={searchParams} />
    </>
  );
}
