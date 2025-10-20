'use client';

import { BanknoteArrowDown, Truck } from 'lucide-react';
import { useFormContext } from '../register';
import { FormOption, FormOptionContainer } from './form-options';

export function PurchaseOptions() {
  const { register } = useFormContext();
  return (
    <FormOptionContainer>
      <FormOption
        label="Agregar envío"
        href={`/gastos/create?compra=${register.Id}&proveedor=${register.Id_proveedor}&concepto=Envío`}
      >
        <Truck className="size-5" />
      </FormOption>
      <FormOption
        label="Agregar otro gasto"
        href={`/gastos/create?compra=${register.Id}&proveedor=${register.Id_proveedor}`}
      >
        <BanknoteArrowDown className="size-5" />
      </FormOption>
      {register.TotalGasto > 0 && (
        <FormOption
          label="Ver lista de gastos"
          href={`/gastos?query=${register.Id} ${register.Nombre_empresa}`}
        >
          <BanknoteArrowDown className="size-5" />
        </FormOption>
      )}
    </FormOptionContainer>
  );
}
