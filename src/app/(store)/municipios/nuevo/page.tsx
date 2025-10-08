import { NewMunicipioForm } from '@/components/forms/municipio/nuevo';
import { Header } from '@/components/header';
import { PageWrapper } from '@/components/page-wrapper';

export const metadata = {
  title: 'Nuevo municipio',
};

export default async function Page() {
  return (
    <>
      <Header title="Nuevo municipio" />
      <PageWrapper>
        <NewMunicipioForm />
      </PageWrapper>
    </>
  );
}
