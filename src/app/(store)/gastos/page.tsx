import { checkAuthorization } from '@/authorization/check-authorization';
import Expenses from '@/components/lists/expenses';
import { PageWrapper } from '@/components/page-wrapper';
import { SiteHeader } from '@/components/site-header';
import { PageProps } from '@/types/types';

export const metadata = {
  title: 'Gastos',
};

export default async function Page({ searchParams }: PageProps) {
  await checkAuthorization();

  return (
    <>
      <SiteHeader title="Gastos" showActionBar />
      <PageWrapper>
        <Expenses searchParams={await searchParams} />
      </PageWrapper>
    </>
  );
}
