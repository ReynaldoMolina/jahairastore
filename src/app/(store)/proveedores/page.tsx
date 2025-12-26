import { checkAuthorization } from '@/authorization/check-authorization';
import { SearchInput } from '@/components/actiontools/search-input';
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
      <SiteHeader title="Proveedores" showActionBar hideBackButton />
      <PageWrapper>
        <SearchInput />
        <Providers data={data} query={query} totalPages={totalPages} />
      </PageWrapper>
    </>
  );
}
