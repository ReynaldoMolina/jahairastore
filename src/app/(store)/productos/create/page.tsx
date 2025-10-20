import { ProductForm } from '@/components/forms/product';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Crear producto',
};

export default async function Page() {
  // const providersData = await getProvidersSelect();
  // const categoriesData = await getCategoriesSelect();

  return (
    <ProductForm
      isNew={true}
      // providersData={providersData}
      // categoriesData={categoriesData}
    />
  );
}
