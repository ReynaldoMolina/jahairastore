import { EditProveedorForm } from '@/components/forms/proveedor/edit';
import { getMunicipiosSelect } from '@/fetch-data/municipio';
import { getProviderById } from '@/fetch-data/provider';
import { PageProps } from '@/types/types';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;

  return {
    title: `Proveedor ${id}`,
  };
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;

  if (!id) {
    notFound();
  }

  const data = await getProviderById(id);
  const municipios = await getMunicipiosSelect();

  return <EditProveedorForm proveedor={data} selectOptions={{ municipios }} />;
}
