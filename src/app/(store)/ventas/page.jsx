import { ListFilter } from '@/components/actiontools/ListFilter';
import SearchInput from '@/components/actiontools/SearchInput';
import { ListTitle } from '@/components/lists/lists';
import Sales from '@/components/lists/Sales';

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
