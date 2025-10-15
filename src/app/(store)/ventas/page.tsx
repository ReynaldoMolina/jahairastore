import { ListFilter } from '@/components/actiontools/list-filter';
import SearchInput from '@/components/actiontools/search-input';
import { ListTitle } from '@/components/lists/lists';
import Sales from '@/components/lists/sales';

export const metadata = {
  title: 'Ventas',
};

export default async function Page(props) {
  const searchParams = await props.searchParams;

  return (
    <>
      <ListTitle title="Ventas" />
      <SearchInput />
      <ListFilter showState={true} searchParams={searchParams} />
      <Sales searchParams={searchParams} />
    </>
  );
}
