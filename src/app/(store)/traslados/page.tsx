import { checkAuthorization } from '@/authorization/check-authorization';
import { SearchInput } from '@/components/filters/search-input';
import { PageWrapper } from '@/components/page-wrapper';
import { SiteHeader } from '@/components/header/site-header';
import { PageProps } from '@/types/types';
import { Traslados } from '@/components/list/transfer';
import { getTraslados } from '@/fetch-data/traslados';

export const metadata = {
  title: 'Traslado de productos',
};

export default async function Page({ searchParams }: PageProps) {
  await checkAuthorization();

  const { data, query, totalPages } = await getTraslados(await searchParams);

  return (
    <>
      <SiteHeader
        title="Traslado de productos"
        showHeaderActions
        hideBackButton
      />
      <PageWrapper>
        <Traslados data={data} query={query} totalPages={totalPages} />
      </PageWrapper>
    </>
  );
}
