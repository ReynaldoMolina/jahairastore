import { ActionBar } from '@/components/action-bar/action-bar';
import { FilterButton } from '@/components/action-bar/filter-button';
import { DataTable } from '@/components/table/data-table';
import { getCategories } from '@/fetch-data/category';
import { SearchParamsProps } from '@/types/types';
import { columns } from './columns';
import { Header } from '@/components/header';
import { PageWrapper } from '@/components/page-wrapper';

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
      <Header title="Categorías" />
      <PageWrapper>
        <ActionBar>
          <FilterButton searchParams={searchParams} />
        </ActionBar>
        <DataTable columns={columns} data={data} />
      </PageWrapper>
    </>
  );
}
