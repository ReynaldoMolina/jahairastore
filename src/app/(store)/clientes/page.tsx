import { FilterButton } from '@/components/action-bar/filter-button';
import { PageProps } from '@/types/types';
import { ActionBar } from '@/components/action-bar/action-bar';
import { DataTable } from '@/components/table/data-table';
import { columns } from './columns';
import { getClients } from '@/fetch-data/client';
import { Header } from '@/components/header';
import { PageWrapper } from '@/components/page-wrapper';

export const metadata = {
  title: 'Clientes',
};

export default async function Page({ searchParams }: PageProps) {
  const { data } = await getClients((await searchParams) ?? {});

  return (
    <>
      <Header title="Clientes" />
      <PageWrapper>
        <ActionBar>
          <FilterButton searchParams={(await searchParams) ?? {}} />
        </ActionBar>
        <DataTable columns={columns} data={data} />
      </PageWrapper>
    </>
  );
}
