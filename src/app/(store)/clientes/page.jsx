import Clients from '@/app/ui/lists/Clients';
import SearchInput from '@/app/ui/actiontools/SearchInput';
import { ListTitle } from '@/app/ui/lists/lists';

export const metadata = {
  title: 'Clientes',
};

export default async function Page(props) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <>
      <ListTitle title="Clientes" />
      <SearchInput />
      <Clients query={query} currentPage={currentPage} />
    </>
  );
}
