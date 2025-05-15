// 'use client';

// import { useParams } from "next/navigation";
import { getCategoryById } from "@/app/lib/data";
import { FormDiv, FormSpan, FormButtons } from "@/app/ui/forms/formInputs";

export default async function CategoryForm({ isNew = false }) {
  // const { id } = useParams();
  const data = await getCategoryById(1);

  return (
    <form
      className="flex flex-col bg-white dark:bg-neutral-700 rounded-xl shadow-md gap-4 mx-auto max-w-200 p-3 w-full">
      {isNew || (
        <FormDiv>
          <span className="flex justify-center items-center h-8 text-xs bg-sky-200 rounded-xl w-full text-black">{data.Id_categoria}</span>
        </FormDiv>
      )}
      <FormDiv>
        <FormSpan name="name" holder="Nombre" value={data.Nombre_categoria} />
      </FormDiv>
      <FormButtons link={'/categories'} label={'Guardar'} />
    </form>
  );
}