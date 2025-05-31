import { FormContainer, FormInput, FormButtons, FormId } from "@/app/ui/forms/formInputs";
import { createCategory, updateCategory } from "@/app/lib/actions";

export function CategoryCreate() {
  return (
    <FormContainer
      action={createCategory}>
      <FormInput name="Nombre_categoria" holder="Nombre" value="" />
      <FormButtons link={'/categories'} label={'Crear'} />
    </FormContainer>
  );
}

export function CategoryEdit({ category }) {
  const updateCategoryWithId = updateCategory.bind(null, category.Id_categoria);  

  return (
    <FormContainer
      action={updateCategoryWithId}>
      <FormId holder="Categoría" value={category.Id_categoria} />
      <FormInput name="Nombre_categoria" holder="Nombre" value={category.Nombre_categoria} />
      <FormButtons link={'/categories'} label={'Guardar'} />
    </FormContainer>
  );
}