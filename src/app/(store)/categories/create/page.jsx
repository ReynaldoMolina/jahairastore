import { FormDiv, FormInput, FormButtons } from "@/app/ui/forms/formInputs";

export default function CategoryAdd() {
  return (
    <section
      className="flex flex-col bg-white dark:bg-neutral-700 rounded-xl shadow-md gap-4 mx-auto max-w-200 p-3 w-full">
      <FormDiv>
        <FormInput name="name" holder="Nombre" value='' />
      </FormDiv>
      <FormButtons link={'/categories'} label={'Crear'} />
    </section>
  );
}