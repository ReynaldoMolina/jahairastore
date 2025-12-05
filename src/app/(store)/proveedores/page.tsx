import { checkAuthorization } from '@/authorization/check-authorization';
import { Providers } from '@/components/lists/providers';
import { PageWrapper } from '@/components/page-wrapper';
import { SiteHeader } from '@/components/site-header';
import { getProveedores } from '@/fetch-data/providers';
import { PageProps } from '@/types/types';

export const metadata = {
  title: 'Proveedores',
};

export default async function Page({ searchParams }: PageProps) {
  await checkAuthorization();

  const { data, query, totalPages } = await getProveedores(await searchParams);

  return (
    <>
      <SiteHeader
        title="Proveedores"
        showSidebarTrigger
        showActionBar
        hideBackButton
      />
      <PageWrapper>
        <Providers data={data} query={query} totalPages={totalPages} />
      </PageWrapper>
    </>
  );
}
