import { checkAuthorization } from '@/authorization/check-authorization';
import { PageWrapper } from '@/components/page-wrapper';
import { SiteHeader } from '@/components/header/site-header';
import { PageProps } from '@/types/types';
import { Wrapper } from '@/components/list/wrapper/transfer';

export const metadata = {
  title: 'Traslado de productos',
};

export default async function Page({ searchParams }: PageProps) {
  await checkAuthorization();

  return (
    <>
      <SiteHeader
        title="Traslado de productos"
        showHeaderActions
        hideBackButton
      />
      <PageWrapper>
        <Wrapper searchParams={await searchParams} />
      </PageWrapper>
    </>
  );
}
