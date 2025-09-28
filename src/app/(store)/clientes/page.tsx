import Clients from '@/components/lists/clients';
import { ListFilter } from '@/components/action-bar/list-filter';
import { ListTitle } from '@/components/lists/lists';
import { PageProps } from '@/types/types';
import ActionBar from '@/components/action-bar/action-bar';

export const metadata = {
  title: 'Clientes',
};

export default async function Page(props: PageProps) {
  const searchParams = (await props.searchParams) ?? {};

  return (
    <>
      <ListTitle title="Clientes" />
      <ActionBar>
        <ListFilter searchParams={searchParams} />
      </ActionBar>
      <Clients searchParams={searchParams} />
    </>
  );
}
