import { checkAuthorization } from '@/authorization/check-authorization';
import { CategoryForm } from '@/components/forms/category';
import { PageWrapper } from '@/components/page-wrapper';
import { SiteHeader } from '@/components/site-header';

export const metadata = {
  title: 'Crear categoría',
};

export default async function Page() {
  await checkAuthorization();

  return (
    <>
      <SiteHeader title="Crear categoría" />
      <PageWrapper>
        <CategoryForm isNew={true} />
      </PageWrapper>
    </>
  );
}
