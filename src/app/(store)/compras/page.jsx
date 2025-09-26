import { ListFilter } from '@/components/actiontools/ListFilter';
import SearchInput from '@/components/actiontools/SearchInput';
import { ListTitle } from '@/components/lists/lists';
import Purchases from '@/components/lists/Purchases';

export const metadata = {
  title: 'Compras',
};

export default async function Page(props) {
  const searchParams = await props.searchParams;

  return (
    <>
      <ListTitle title="Compras" />
      <SearchInput />
      <ListFilter searchParams={searchParams} />
      <Purchases searchParams={searchParams} />
    </>
  );
}
