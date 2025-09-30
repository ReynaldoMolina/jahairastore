import { ListTitle } from '@/components/lists/lists';
import { ListFilter } from '@/components/action-bar/list-filter';
import { PageProps } from '@/types/types';
import ActionBar from '@/components/action-bar/action-bar';
import { DataTable } from '@/components/data-table';
import { columns } from './columns';
import { getExpenses } from '@/fetch-data/expenses';

export const metadata = {
  title: 'Gastos',
};

export default async function Page(props: PageProps) {
  const searchParams = (await props.searchParams) ?? {};
  const { data } = await getExpenses(searchParams);

  return (
    <>
      <ListTitle title="Gastos" />
      <ActionBar>
        <ListFilter searchParams={searchParams} />
      </ActionBar>
      <DataTable columns={columns} data={data} />
    </>
  );
}
