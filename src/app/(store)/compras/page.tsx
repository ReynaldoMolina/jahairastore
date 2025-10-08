import { ActionBar } from '@/components/action-bar/action-bar';
import { ListFilter } from '@/components/action-bar/filter-button';
import { DataTable } from '@/components/table/data-table';
import { ListTitle } from '@/components/lists/lists';
import { PageProps } from '@/types/types';
import { columns } from './columns';
import { getPurchases } from '@/fetch-data/purchase';

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
