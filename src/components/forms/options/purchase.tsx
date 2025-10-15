'use client';

import { BanknoteArrowDown, Truck } from 'lucide-react';
import { useFormContext } from '../register';
import { FormOption, FormOptionContainer } from './form-options';

export function PurchaseOptions() {
  const { register } = useFormContext();
  return (
    <FormOptionContainer>
      <div className="flex flex-col md:flex-row gap-1 md:items-center">
        <p className="text-xs opacity-60 px-1">Agregar</p>
        <div className="flex gap-1 items-center">
          <FormOption
            label="Gasto"
            href={`/gastos/create?compra=${register.Id}&proveedor=${register.Id_proveedor}`}
          >
            <BanknoteArrowDown className="size-5" />
          </FormOption>
          <FormOption
            label="Envío"
            href={`/gastos/create?compra=${register.Id}&proveedor=${register.Id_proveedor}&concepto=Envío`}
          >
            <Truck className="size-5" />
          </FormOption>
        </div>
      </div>
      {register.TotalGasto > 0 && (
        <FormOption
          label="Ver gastos"
          href={`/gastos?query=${register.Id} ${register.Nombre_empresa}`}
        >
          <BanknoteArrowDown className="size-5" />
        </FormOption>
      )}
    </FormOptionContainer>
  );
}
