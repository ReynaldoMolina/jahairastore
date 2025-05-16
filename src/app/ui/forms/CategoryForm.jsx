import { FormInput, FormButtons, FormId } from "@/app/ui/forms/formInputs";
import { createCategory, updateCategory } from "@/app/lib/actions";

export function CategoryCreate() {
  return (
    <form
      action={createCategory}
      className="flex flex-col bg-white dark:bg-neutral-700 rounded-xl shadow-md gap-4 mx-auto max-w-130 p-3 w-full">
      <FormInput name="Nombre_categoria" holder="Nombre" value="" />
      <FormButtons link={'/categories'} label={'Guardar'} />
    </form>
  );
}

export function CategoryEdit({ category }) {
  const updateCategoryWithId = updateCategory.bind(null, category.Id_categoria);  

  return (
    <form
      action={updateCategoryWithId}
      className="flex flex-col bg-white dark:bg-neutral-700 rounded-xl shadow-md gap-4 mx-auto max-w-130 p-3 w-full">
      <FormId holder="Categoría" value={category.Id_categoria} />
      <FormInput name="Nombre_categoria" holder="Nombre" value={category.Nombre_categoria} />
      <FormButtons link={'/categories'} label={'Guardar'} />
    </form>
  );
}