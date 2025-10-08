import { ListTitle } from '@/components/lists/lists';
import { ListFilter } from '@/components/action-bar/filter-button';
import { PageProps } from '@/types/types';
import { ActionBar } from '@/components/action-bar/action-bar';
import { DataTable } from '@/components/table/data-table';
import { columns } from './columns';
import { getProducts } from '@/fetch-data/product';

export const metadata = {
  title: 'Productos',
};

export default async function Page(props: PageProps) {
  const searchParams = (await props.searchParams) ?? {};
  const { data } = await getProducts(searchParams);

  return (
    <>
      <ListTitle title="Productos" />
      <ActionBar>
        <ListFilter searchParams={searchParams} />
      </ActionBar>
      <DataTable columns={columns} data={data} />
    </>
  );
}
