import { ListTitle } from '@/app/ui/lists/lists';
import SearchInput from '@/app/ui/actiontools/SearchInput';
import { ListFilter } from '@/app/ui/actiontools/ListFilter';
import Expenses from '@/app/ui/lists/Expenses';

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
