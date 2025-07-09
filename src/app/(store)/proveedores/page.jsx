import { ListFilter } from '@/app/ui/actiontools/ListFilter';
import SearchInput from '@/app/ui/actiontools/SearchInput';
import { ListTitle } from '@/app/ui/lists/lists';
import Providers from '@/app/ui/lists/Providers';

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
