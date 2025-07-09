import { ListFilter } from '@/app/ui/actiontools/ListFilter';
import SearchInput from '@/app/ui/actiontools/SearchInput';
import { ListTitle } from '@/app/ui/lists/lists';
import Sales from '@/app/ui/lists/Sales';

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
