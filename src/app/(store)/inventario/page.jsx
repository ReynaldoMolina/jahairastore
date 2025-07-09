import { ListTitle } from '@/app/ui/lists/lists';
import SearchInput from '@/app/ui/actiontools/SearchInput';
import { ListFilter } from '@/app/ui/actiontools/ListFilter';
import Inventory from '@/app/ui/lists/Inventory';

export const metadata = {
  title: 'Inventario',
};

export default async function Page(props) {
  const searchParams = await props.searchParams;

  return (
    <>
      <ListTitle title="Inventario" />
      <SearchInput allowNew={false} />
      <ListFilter
        showState={true}
        stateLabel="Disponibles"
        searchParams={searchParams}
      />
      <Inventory searchParams={searchParams} />
    </>
  );
}
