import SearchInput from '@/app/ui/actiontools/SearchInput';
import Categories from '@/app/ui/lists/Categories';
import { ListTitle } from '@/app/ui/lists/lists';

export const metadata = {
  title: 'Categorías',
};

export default async function Page(props) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <>
      <ListTitle title="Categorías" />
      <SearchInput />
      <Categories query={query} currentPage={currentPage} />
    </>
  );
}
