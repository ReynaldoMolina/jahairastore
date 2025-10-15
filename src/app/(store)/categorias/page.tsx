import { ListFilter } from '@/components/actiontools/list-filter';
import SearchInput from '@/components/actiontools/search-input';
import Categories from '@/components/lists/categories';
import { ListTitle } from '@/components/lists/lists';

export const metadata = {
  title: 'Categorías',
};

export default async function Page(props) {
  const searchParams = await props.searchParams;

  return (
    <>
      <ListTitle title="Categorías" />
      <SearchInput />
      <ListFilter searchParams={searchParams} />
      <Categories searchParams={searchParams} />
    </>
  );
}
