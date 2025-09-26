import { ListTitle } from '@/app/ui/lists/lists';
import SearchInput from '@/app/ui/actiontools/SearchInput';
import { ListFilter } from '@/app/ui/actiontools/ListFilter';
import Products from '@/app/ui/lists/Products';

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
