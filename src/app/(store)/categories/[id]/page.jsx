import fetchData from "@/app/lib/fetchData";
import FormDiv from "@/app/ui/formInputs/FormDiv";
import FormInput from "@/app/ui/formInputs/FormInput";
import FormButtons from "@/app/ui/formInputs/FormButtons";

export default async function CategoryForm({ params }) {
  const { id } = params;
  const data = await fetchData(`/categories/${id}`);
  console.log(data);

  return (
    <section
      className="flex flex-col bg-white dark:bg-neutral-700 rounded-xl shadow-md gap-4 mx-auto max-w-200 p-3 w-full">
      <FormDiv>
        <span className="flex justify-center items-center h-8 text-xs bg-sky-200 rounded-xl w-full text-black">{data.id}</span>
      </FormDiv>
      <FormDiv>
        <FormInput name="name" holder="Nombre" value={data.name} />
      </FormDiv>
      <FormButtons link={'/categories'} label={'Guardar'} />
    </section>
  );
}