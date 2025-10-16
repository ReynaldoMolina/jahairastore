import { ListFilter } from '@/components/actiontools/list-filter';
import SearchInput from '@/components/actiontools/search-input';
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
      <SearchInput>
        <ListFilter searchParams={searchParams} />
      </SearchInput>
      <Providers searchParams={searchParams} />
    </>
  );
}
