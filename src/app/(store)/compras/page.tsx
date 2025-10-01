import ActionBar from '@/components/action-bar/action-bar';
import { ListFilter } from '@/components/action-bar/list-filter';
import { DataTable } from '@/components/data-table';
import { ListTitle } from '@/components/lists/lists';
import { PageProps } from '@/types/types';
import { columns } from './columns';
import { getPurchases } from '@/fetch-data/purchases';

export const metadata = {
  title: 'Compras',
};

export default async function Page(props: PageProps) {
  const searchParams = (await props.searchParams) ?? {};
  const { data } = await getPurchases(searchParams);

  return (
    <>
      <ListTitle title="Compras" />
      <ActionBar>
        <ListFilter searchParams={searchParams} />
      </ActionBar>
      <DataTable columns={columns} data={data} />
    </>
  );
}
