import { checkAuthorization } from '@/authorization/check-authorization';
import { ListFilter } from '@/components/actiontools/list-filter';
import { Inventory } from '@/components/lists/inventory';
import { PageWrapper } from '@/components/page-wrapper';
import { SiteHeader } from '@/components/site-header';
import { PageProps } from '@/types/types';

export const metadata = {
  title: 'Inventario',
};

export default async function Page({ searchParams }: PageProps) {
  await checkAuthorization();

  return (
    <>
      <SiteHeader title="Inventario" showActionBar hideNewButton>
        <ListFilter listName="inventario" searchParams={await searchParams} />
      </SiteHeader>
      <PageWrapper>
        <Inventory searchParams={await searchParams} />
      </PageWrapper>
    </>
  );
}
