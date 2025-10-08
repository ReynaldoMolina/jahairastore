import { ActionBar } from '@/components/action-bar/action-bar';
import { DataTable } from '@/components/table/data-table';
import { SearchParamsProps } from '@/types/types';
import { columns } from './columns';
import { getMunicipios } from '@/fetch-data/municipio';
import { FilterButton } from '@/components/action-bar/filter-button';
import { Header } from '@/components/header';
import { PageWrapper } from '@/components/page-wrapper';

export const metadata = {
  title: 'Municipios',
};

interface PageProps {
  params?: string;
  searchParams?: SearchParamsProps;
}

export default async function Page({ searchParams }: PageProps) {
  const { data } = await getMunicipios((await searchParams) ?? {});

  return (
    <>
      <Header title="Municipios" />
      <PageWrapper>
        <ActionBar>
          <FilterButton searchParams={(await searchParams) ?? {}} />
        </ActionBar>
        <DataTable columns={columns} data={data} />
      </PageWrapper>
    </>
  );
}
