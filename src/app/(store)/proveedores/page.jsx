import { ListFilter } from '@/components/actiontools/ListFilter';
import SearchInput from '@/components/actiontools/SearchInput';
import { ListTitle } from '@/components/lists/lists';
import Providers from '@/components/lists/Providers';

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
