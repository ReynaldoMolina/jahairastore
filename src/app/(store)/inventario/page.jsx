import { ListTitle } from '@/components/lists/lists';
import SearchInput from '@/components/actiontools/SearchInput';
import { ListFilter } from '@/components/actiontools/ListFilter';
import Inventory from '@/components/lists/Inventory';

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
