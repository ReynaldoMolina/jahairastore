import { checkAuthorization } from '@/authorization/check-authorization';
import Products from '@/components/lists/products';
import { PageWrapper } from '@/components/page-wrapper';
import { SiteHeader } from '@/components/site-header';
import { PageProps } from '@/types/types';

export const metadata = {
  title: 'Productos',
};

export default async function Page({ searchParams }: PageProps) {
  await checkAuthorization();

  return (
    <>
      <SiteHeader title="Productos" showActionBar />
      <PageWrapper>
        <Products searchParams={await searchParams} />
      </PageWrapper>
    </>
  );
}
