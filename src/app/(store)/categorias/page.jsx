import { ListFilter } from '@/components/actiontools/ListFilter';
import SearchInput from '@/components/actiontools/SearchInput';
import Categories from '@/components/lists/Categories';
import { ListTitle } from '@/components/lists/lists';

export const metadata = {
  title: 'Categorías',
};

export default async function Page(props) {
  const searchParams = await props.searchParams;

  return (
    <>
      <ListTitle title="Categorías" />
      <SearchInput showFilter={false} />
      <ListFilter searchParams={searchParams} />
      <Categories searchParams={searchParams} />
    </>
  );
}
