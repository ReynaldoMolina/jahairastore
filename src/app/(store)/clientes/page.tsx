import { checkAuthorization } from '@/authorization/check-authorization';
import { SearchInput } from '@/components/actiontools/search-input';
import { Clients } from '@/components/lists/clients';
import { PageWrapper } from '@/components/page-wrapper';
import { SiteHeader } from '@/components/site-header';
import { getClients } from '@/fetch-data/clients';
import { PageProps } from '@/types/types';

export const metadata = {
  title: 'Clientes',
};

export default async function Page({ searchParams }: PageProps) {
  await checkAuthorization();

  const { data, query, totalPages } = await getClients(await searchParams);

  return (
    <>
      <SiteHeader title="Clientes" showActionBar hideBackButton />
      <PageWrapper>
        <SearchInput />
        <Clients data={data} query={query} totalPages={totalPages} />
      </PageWrapper>
    </>
  );
}
