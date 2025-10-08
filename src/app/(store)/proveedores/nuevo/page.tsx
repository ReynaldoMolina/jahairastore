import { NewProveedorForm } from '@/components/forms/proveedor/nuevo';
import { Header } from '@/components/header';
import { PageWrapper } from '@/components/page-wrapper';
import { getMunicipiosSelect } from '@/fetch-data/municipio';

export const metadata = {
  title: 'Nuevo proveedor',
};

export default async function Page() {
  const municipios = await getMunicipiosSelect();
  return (
    <>
      <Header title="Nuevo proveedor" />
      <PageWrapper>
        <NewProveedorForm selectOptions={{ municipios }} />
      </PageWrapper>
    </>
  );
}
