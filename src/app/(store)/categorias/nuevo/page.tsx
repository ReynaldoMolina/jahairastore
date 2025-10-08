import { NewCategoriaForm } from '@/components/forms/categoria/nuevo';
import { Header } from '@/components/header';
import { PageWrapper } from '@/components/page-wrapper';

export const metadata = {
  title: 'Crear categoría',
};

export default async function Page() {
  return (
    <>
      <Header title="Nueva categoría" />
      <PageWrapper>
        <NewCategoriaForm />
      </PageWrapper>
    </>
  );
}
