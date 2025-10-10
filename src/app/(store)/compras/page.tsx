import { ActionBar } from '@/components/action-bar/action-bar';
import { DataTable } from '@/components/table/data-table';
import { PageProps } from '@/types/types';
import { columns } from './columns';
import { getPurchases } from '@/fetch-data/purchase';
import { FilterButton } from '@/components/action-bar/filter-button';
import { Header } from '@/components/header';
import { PageWrapper } from '@/components/page-wrapper';

export const metadata = {
  title: 'Compras',
};

export default async function Page({ searchParams }: PageProps) {
  const { data } = await getPurchases((await searchParams) ?? {});

  return (
    <>
      <Header title="Compras" />
      <PageWrapper>
        <ActionBar>
          <FilterButton searchParams={(await searchParams) ?? {}} />
        </ActionBar>
        <DataTable columns={columns} data={data} />
      </PageWrapper>
    </>
  );
}
