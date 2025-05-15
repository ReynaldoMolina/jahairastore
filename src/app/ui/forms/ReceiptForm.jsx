import { FormDiv, FormInput, FormButtons, FormDate } from "@/app/ui/forms/formInputs";

export function ReceiptCreate() {
  return (
    <form
      className="flex flex-col bg-white dark:bg-neutral-700 rounded-xl shadow-md gap-4 mx-auto max-w-130 p-3 w-full">
      <FormDiv>
        <FormInput name="Id_pedido" holder="Pedido" value="" type="number" />
        <FormDate name="Fecha" />
      </FormDiv>
      <FormDiv>
        <FormInput name="Id_cliente" holder="Cliente" value="" />
      </FormDiv>
      <FormDiv>
        <FormInput name="Abono" holder="Abono" value={0} type="number" />
        <FormInput name="Saldo" holder="Saldo" value={0} type="number" />
      </FormDiv>
      <FormDiv>
        <FormInput name="Concepto" holder="Descripción" value="" />
      </FormDiv>
      <FormButtons link={'/receipts'} label={'Guardar'} />
    </form>
  );
}