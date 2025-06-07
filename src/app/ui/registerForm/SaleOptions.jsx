'use client';

import { FormOptionContainer, FormOption } from "@/app/ui/forms/FormOptions";
import ExpensesIcon from "@/app/ui/icons/expenses.svg";
import ShipmentIcon from "@/app/ui/icons/shipping.svg";

export function SaleOptions({ purchase }) {
  return (
    <FormOptionContainer>
      <div className="flex gap-1 items-center">
        <FormOption label="Gasto" href={`/expenses/create?purchase=${purchase.Id_compra}&provider=${purchase.Id_proveedor}`}>
          <ExpensesIcon className="size-5" />
        </FormOption>
        <FormOption label="Envío" href={`/expenses/create?purchase=${purchase.Id_compra}&provider=${purchase.Id_proveedor}&description=Envío`}>
          <ShipmentIcon className="size-5" />
        </FormOption>
      </div>
      {purchase.TotalGasto > 0 &&
        <FormOption label="Gastos" href={`/expenses?query=${purchase.Id_compra} ${purchase.Nombre_empresa}`}>
          <ExpensesIcon className="size-5" />
        </FormOption>
      }
    </FormOptionContainer>
  );
}