import ActionBar from '@/components/action-bar/action-bar';
import { ListFilter } from '@/components/action-bar/list-filter';
import { ListTitle } from '@/components/lists/lists';
import Purchases from '@/components/lists/purchases';
import { PageProps } from '@/types/types';

export const metadata = {
  title: 'Compras',
};

export default async function Page(props: PageProps) {
  const searchParams = (await props.searchParams) ?? {};

  return (
    <>
      <ListTitle title="Compras" />
      <ActionBar>
        <ListFilter searchParams={searchParams} />
      </ActionBar>
      <Purchases searchParams={searchParams} />
    </>
  );
}
