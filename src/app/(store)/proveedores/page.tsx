import { FilterButton } from '@/components/action-bar/filter-button';
import { DataTable } from '@/components/table/data-table';
import { columns } from './columns';
import { PageProps } from '@/types/types';
import { getProviders } from '@/fetch-data/provider';
import { ActionBar } from '@/components/action-bar/action-bar';
import { Header } from '@/components/header';
import { PageWrapper } from '@/components/page-wrapper';

export const metadata = {
  title: 'Proveedores',
};

export default async function Page(props: PageProps) {
  const searchParams = (await props.searchParams) ?? {};
  const { data } = await getProviders(searchParams);

  return (
    <>
      <Header title="Proveedores" />
      <PageWrapper>
        <ActionBar>
          <FilterButton searchParams={searchParams} />
        </ActionBar>
        <DataTable columns={columns} data={data} />
      </PageWrapper>
    </>
  );
}
