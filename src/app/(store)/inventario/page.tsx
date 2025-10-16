import { ListFilter } from '@/components/actiontools/list-filter';
import SearchInput from '@/components/actiontools/search-input';
import Inventory from '@/components/lists/inventory';
import { ListTitle } from '@/components/lists/lists';

export const metadata = {
  title: 'Inventario',
};

export default async function Page(props) {
  const searchParams = await props.searchParams;

  return (
    <>
      <ListTitle title="Inventario" />
      <SearchInput allowNew={false}>
        <ListFilter
          showState={true}
          stateLabel="Disponibles"
          searchParams={searchParams}
        />
      </SearchInput>
      <Inventory searchParams={searchParams} />
    </>
  );
}
