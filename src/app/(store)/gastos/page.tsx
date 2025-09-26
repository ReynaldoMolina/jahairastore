import { ListTitle } from '@/components/lists/lists';
import SearchInput from '@/components/actiontools/search-input';
import { ListFilter } from '@/components/actiontools/list-filter';
import Expenses from '@/components/lists/expenses';

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
