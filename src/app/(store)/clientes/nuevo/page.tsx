import { NewClientForm } from '@/components/forms/cliente/nuevo';
import { Header } from '@/components/header';
import { PageWrapper } from '@/components/page-wrapper';
import { getMunicipiosSelect } from '@/fetch-data/municipio';

export const metadata = {
  title: 'Nuevo cliente',
};

export default async function Page() {
  const municipios = await getMunicipiosSelect();

  return (
    <>
      <Header title="Nuevo cliente" />
      <PageWrapper>
        <NewClientForm selectOptions={{ municipios }} />
      </PageWrapper>
    </>
  );
}
