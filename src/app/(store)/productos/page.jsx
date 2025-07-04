import SearchInput from '@/app/ui/actiontools/SearchInput';
import { ListTitle } from '@/app/ui/lists/lists';
import Products from '@/app/ui/lists/Products';

export const metadata = {
  title: 'Productos',
};

export default async function Page(props) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <>
      <ListTitle title="Productos" />
      <SearchInput />
      <Products query={query} currentPage={currentPage} />
    </>
  );
}
