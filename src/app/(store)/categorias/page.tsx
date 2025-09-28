import { ListFilter } from '@/components/actiontools/list-filter';
import SearchInput from '@/components/actiontools/search-input';
import Categories from '@/components/lists/categories';
import { ListTitle } from '@/components/lists/lists';

export const metadata = {
  title: 'Categorías',
};

interface PageProps {
  params?: string;
  searchParams?: string;
}

export default async function Page(props: PageProps) {
  const searchParams = await props.searchParams;

  return (
    <>
      <ListTitle title="Categorías" />
      <SearchInput />
      <ListFilter searchParams={searchParams ?? {}} stateLabel="Estado" />
      <Categories searchParams={searchParams} />
    </>
  );
}
