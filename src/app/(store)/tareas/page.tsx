import { checkAuthorization } from '@/authorization/check-authorization';
import { Tareas } from '@/components/lists/tareas';
import { PageWrapper } from '@/components/page-wrapper';
import { SiteHeader } from '@/components/site-header';
import { getTareas } from '@/fetch-data/tareas';
import { PageProps } from '@/types/types';

export const metadata = {
  title: 'Tareas',
};

export default async function Page({ searchParams }: PageProps) {
  await checkAuthorization();

  const { data, query, totalPages } = await getTareas(await searchParams);

  return (
    <>
      <SiteHeader title="Tareas" showActionBar hideBackButton />
      <PageWrapper>
        <Tareas data={data} query={query} totalPages={totalPages} />
      </PageWrapper>
    </>
  );
}
