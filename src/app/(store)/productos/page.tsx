import { ListTitle } from '@/components/lists/lists';
import SearchInput from '@/components/actiontools/search-input';
import { ListFilter } from '@/components/actiontools/list-filter';
import Products from '@/components/lists/Products';

export const metadata = {
  title: 'Productos',
};

export default async function Page(props) {
  const searchParams = await props.searchParams;

  return (
    <>
      <ListTitle title="Productos" />
      <SearchInput />
      <ListFilter searchParams={searchParams} />
      <Products searchParams={searchParams} />
    </>
  );
}
