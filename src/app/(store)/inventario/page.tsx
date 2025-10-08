import { ListTitle } from '@/components/lists/lists';
import SearchInput from '@/components/action-bar/search-input';
import { ListFilter } from '@/components/action-bar/filter-button';
import Inventory from '@/components/lists/inventory';

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
