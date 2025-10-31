import { checkAuthorization } from '@/authorization/check-authorization';
import Categories from '@/components/lists/categories';
import { PageWrapper } from '@/components/page-wrapper';
import { SiteHeader } from '@/components/site-header';
import { PageProps } from '@/types/types';

export const metadata = {
  title: 'Categorías',
};

export default async function Page({ searchParams }: PageProps) {
  await checkAuthorization();

  return (
    <>
      <SiteHeader title="Categorías" showActionBar />
      <PageWrapper>
        <Categories searchParams={await searchParams} />
      </PageWrapper>
    </>
  );
}
