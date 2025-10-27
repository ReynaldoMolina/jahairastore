import { checkAuthorization } from '@/authorization/check-authorization';
import { CategoryForm } from '@/components/forms/category';
import { PageWrapper } from '@/components/page-wrapper';
import { SiteHeader } from '@/components/site-header';
import { getCategoryById } from '@/fetch-data/data';
import { notFound } from 'next/navigation';

export async function generateMetadata(props) {
  const { id } = await props.params;

  return {
    title: `Categoría ${id}`,
  };
}

export default async function Page(props) {
  await checkAuthorization();

  const params = await props.params;
  const id = params.id;
  const data = await getCategoryById(id);

  if (!data) {
    notFound();
  }

  return (
    <>
      <SiteHeader title={`Categoría ${id}`} />
      <PageWrapper>
        <CategoryForm isNew={false} category={data} />
      </PageWrapper>
    </>
  );
}
