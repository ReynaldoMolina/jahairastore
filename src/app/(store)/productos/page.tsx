import { ListFilter } from '@/components/actiontools/list-filter';
import SearchInput from '@/components/actiontools/search-input';
import { ListTitle } from '@/components/lists/lists';
import Products from '@/components/lists/products';

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
