import { checkAuthorization } from '@/authorization/check-authorization';
import { ListFilter } from '@/components/actiontools/list-filter';
import Sales from '@/components/lists/sales';
import { PageWrapper } from '@/components/page-wrapper';
import { SiteHeader } from '@/components/site-header';
import { PageProps } from '@/types/types';

export const metadata = {
  title: 'Ventas',
};

export default async function Page({ searchParams }: PageProps) {
  await checkAuthorization();

  return (
    <>
      <SiteHeader title="Ventas" showActionBar>
        <ListFilter searchParams={await searchParams} listName="ventas" />
      </SiteHeader>
      <PageWrapper>
        <Sales searchParams={searchParams} />
      </PageWrapper>
    </>
  );
}
