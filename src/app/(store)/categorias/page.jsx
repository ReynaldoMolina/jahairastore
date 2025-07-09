import { ListFilter } from '@/app/ui/actiontools/ListFilter';
import SearchInput from '@/app/ui/actiontools/SearchInput';
import Categories from '@/app/ui/lists/Categories';
import { ListTitle } from '@/app/ui/lists/lists';

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
