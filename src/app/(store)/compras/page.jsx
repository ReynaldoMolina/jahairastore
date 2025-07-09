import { ListFilter } from '@/app/ui/actiontools/ListFilter';
import SearchInput from '@/app/ui/actiontools/SearchInput';
import { ListTitle } from '@/app/ui/lists/lists';
import Purchases from '@/app/ui/lists/Purchases';

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
