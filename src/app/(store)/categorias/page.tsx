import ActionBar from '@/components/action-bar/action-bar';
import { ListFilter } from '@/components/action-bar/list-filter';
import Categories from '@/components/lists/categories';
import { ListTitle } from '@/components/lists/lists';
import { SearchParamsProps } from '@/types/types';

export const metadata = {
  title: 'Categorías',
};

interface PageProps {
  params?: string;
  searchParams?: SearchParamsProps;
}

export default async function Page(props: PageProps) {
  const searchParams = (await props.searchParams) ?? {};

  return (
    <>
      <ListTitle title="Categorías" />
      <ActionBar>
        <ListFilter searchParams={searchParams} stateLabel="Con saldo" />
      </ActionBar>
      <Categories searchParams={searchParams} />
    </>
  );
}
