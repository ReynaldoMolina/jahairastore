'use client';

import { FormOptionContainer, FormOption } from "@/app/ui/forms/FormOptions";
import ReceiptsIcon from "@/app/ui/forms/icons/receipts.svg";

export function PurchaseOptions({ purchase }) {
  return (
    <FormOptionContainer>
      <div className="flex gap-1 items-center">
        <FormOption label="Gasto" href={`/expenses/create?purchase=${purchase.Id_compra}&provider=${purchase.Id_proveedor}&description="Gasto"`}>
        </FormOption>
        <FormOption label="Envío" href={`/expenses/create?purchase=${purchase.Id_compra}&provider=${purchase.Id_proveedor}&description="Envío"`}>
        </FormOption>
      </div>
      {purchase.TotalGastos > 0 &&
        <FormOption label="Gastos" href={`expenses/?query=${purchase.Id_compra} ${purchase.Nombre_empresa}`}>
          <ReceiptsIcon className="size-5" />
        </FormOption>
      }
    </FormOptionContainer>
  );
}