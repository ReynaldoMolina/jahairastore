import ActionBar from '@/components/action-bar/action-bar';
import { ListFilter } from '@/components/action-bar/list-filter';
import { DataTable } from '@/components/data-table';
import { ListTitle } from '@/components/lists/lists';
import { getCategories } from '@/fetch-data/categories';
import { SearchParamsProps } from '@/types/types';
import { columns } from './columns';

export const metadata = {
  title: 'Categorías',
};

interface PageProps {
  params?: string;
  searchParams?: SearchParamsProps;
}

export default async function Page(props: PageProps) {
  const searchParams = (await props.searchParams) ?? {};
  const { data } = await getCategories(searchParams);

  return (
    <>
      <ListTitle title="Categorías" />
      <ActionBar>
        <ListFilter searchParams={searchParams} />
      </ActionBar>
      <DataTable columns={columns} data={data} />
    </>
  );
}
