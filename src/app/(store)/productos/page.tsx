import { PageProps } from '@/types/types';
import { ActionBar } from '@/components/action-bar/action-bar';
import { DataTable } from '@/components/table/data-table';
import { columns } from './columns';
import { getProducts } from '@/fetch-data/product';
import { FilterButton } from '@/components/action-bar/filter-button';
import { PageWrapper } from '@/components/page-wrapper';
import { Header } from '@/components/header';

export const metadata = {
  title: 'Productos',
};

export default async function Page(props: PageProps) {
  const searchParams = (await props.searchParams) ?? {};
  const { data } = await getProducts(searchParams);

  return (
    <>
      <Header title="Productos" />
      <PageWrapper>
        <ActionBar>
          <FilterButton searchParams={searchParams} />
        </ActionBar>
        <DataTable columns={columns} data={data} />
      </PageWrapper>
    </>
  );
}
