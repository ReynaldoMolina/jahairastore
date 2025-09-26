import { ListTitle } from '@/components/lists/lists';
import SearchInput from '@/components/actiontools/SearchInput';
import { ListFilter } from '@/components/actiontools/ListFilter';
import Expenses from '@/components/lists/Expenses';

export const metadata = {
  title: 'Gastos',
};

export default async function Page(props) {
  const searchParams = await props.searchParams;

  return (
    <>
      <ListTitle title="Gastos" />
      <SearchInput allowNew={false} />
      <ListFilter searchParams={searchParams} />
      <Expenses searchParams={searchParams} />
    </>
  );
}
