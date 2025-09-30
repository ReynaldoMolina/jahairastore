import { ListFilter } from '@/components/action-bar/list-filter';
import { DataTable } from '@/components/data-table';
import { ListTitle } from '@/components/lists/lists';
import { columns } from './columns';
import { PageProps } from '@/types/types';
import { getProviders } from '@/fetch-data/providers';
import ActionBar from '@/components/action-bar/action-bar';

export const metadata = {
  title: 'Proveedores',
};

export default async function Page(props: PageProps) {
  const searchParams = (await props.searchParams) ?? {};
  const { data } = await getProviders(searchParams);

  return (
    <>
      <ListTitle title="Proveedores" />
      <ActionBar>
        <ListFilter searchParams={searchParams} />
      </ActionBar>
      <DataTable columns={columns} data={data} />
    </>
  );
}
