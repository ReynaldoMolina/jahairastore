import SearchInput from '@/app/ui/actiontools/SearchInput';
import { ListTitle } from '@/app/ui/lists/lists';
import Providers from '@/app/ui/lists/Providers';

export const metadata = {
  title: 'Proveedores',
};

export default async function Page(props) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <>
      <ListTitle title="Proveedores" />
      <SearchInput />
      <Providers query={query} currentPage={currentPage} />
    </>
  );
}
