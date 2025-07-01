'use client';

import {
  FormOptionContainer,
  FormOption,
} from '@/app/ui/forms/Options/FormOptions';
import ExpensesIcon from '@/app/ui/icons/expenses.svg';
import ShipmentIcon from '@/app/ui/icons/shipping.svg';

export function PurchaseOptions({ purchase }) {
  return (
    <FormOptionContainer>
      <div className="flex gap-2 md:gap-3 items-center">
        <FormOption
          label="Gasto"
          href={`/gastos/create?compra=${purchase.Id}&proveedor=${purchase.Id_proveedor}`}
        >
          <ExpensesIcon className="size-5" />
        </FormOption>
        <FormOption
          label="Envío"
          href={`/gastos/create?compra=${purchase.Id}&proveedor=${purchase.Id_proveedor}&concepto=Envío`}
        >
          <ShipmentIcon className="size-5" />
        </FormOption>
      </div>
      {purchase.TotalGasto > 0 && (
        <FormOption
          label="Gastos"
          href={`/gastos?query=${purchase.Id} ${purchase.Nombre_empresa}`}
        >
          <ExpensesIcon className="size-5" />
        </FormOption>
      )}
    </FormOptionContainer>
  );
}
