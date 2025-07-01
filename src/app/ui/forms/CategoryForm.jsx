import {
  FormContainer,
  FormInput,
  FormButtons,
  FormId,
} from '@/app/ui/forms/FormInputs/formInputs';
import { createCategory, updateCategory } from '@/app/lib/actions';

export function CategoryCreate() {
  return (
    <FormContainer action={createCategory}>
      <FormId holder="Crear categoría" />
      <FormInput name="Nombre" holder="Nombre" value="" />
      <FormButtons link={'/categorias'} label={'Crear'} />
    </FormContainer>
  );
}

export function CategoryEdit({ category }) {
  const updateCategoryWithId = updateCategory.bind(null, category.Id);

  return (
    <FormContainer action={updateCategoryWithId}>
      <FormId holder="Categoría" value={category.Id} />
      <FormInput name="Nombre" holder="Nombre" value={category.Nombre} />
      <FormButtons link={'/categorias'} label={'Guardar'} />
    </FormContainer>
  );
}
