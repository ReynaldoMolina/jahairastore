import { checkAuthorization } from '@/authorization/check-authorization';
import { SearchInput } from '@/components/filters/search-input';
import { PageWrapper } from '@/components/page-wrapper';
import { SiteHeader } from '@/components/header/site-header';
import { PageProps } from '@/types/types';
import { Ajustes } from '@/components/list/ajustes-inventario';
import { getAjustesInventario } from '@/fetch-data/ajustes';

export const metadata = {
  title: 'Ajuste de inventario',
};

export default async function Page({ searchParams }: PageProps) {
  await checkAuthorization();

  const { data, query, totalPages } = await getAjustesInventario(
    await searchParams
  );

  return (
    <>
      <SiteHeader
        title="Ajuste de inventario"
        showHeaderActions
        hideBackButton
      />
      <PageWrapper>
        <SearchInput />
        <Ajustes data={data} query={query} totalPages={totalPages} />
      </PageWrapper>
    </>
  );
}
