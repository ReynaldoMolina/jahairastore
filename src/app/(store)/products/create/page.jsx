import { ProductCreate } from '@/app/ui/forms/ProductForm';
import { getProvidersSelect, getCategoriesSelect } from '@/app/lib/data';
 
export default async function Page() {
  const providers = await getProvidersSelect();
  const categories = await getCategoriesSelect();
  
  return (
    <ProductCreate providers={providers} categories={categories} />
  );
}