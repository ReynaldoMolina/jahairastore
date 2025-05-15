import { FormDiv, FormInput, FormButtons, FormDate } from "@/app/ui/forms/formInputs";

export function ReceiptCreate() {
  return (
    <form
      className="flex flex-col bg-white dark:bg-neutral-700 rounded-xl shadow-md gap-4 mx-auto max-w-130 p-3 w-full">
      <FormDiv>
        <FormInput name="idpedido" holder="Pedido" value="" type="number" />
        <FormDate name />
      </FormDiv>
      <FormDiv>
        <FormInput name="client" holder="Cliente" value="" />
      </FormDiv>
      <FormDiv>
        <FormInput name="abono" holder="Abono" value={0} type="number" />
        <FormInput name="saldo" holder="Saldo" value={0} type="number" />
      </FormDiv>
      <FormDiv>
        <FormInput name="description" holder="Descripción" value="" />
      </FormDiv>
      <FormButtons link={'/receipts'} label={'Guardar'} />
    </form>
  );
}