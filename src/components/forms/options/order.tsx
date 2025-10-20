'use client';

import { Check, DollarSign, Pencil, Percent, Receipt } from 'lucide-react';
import { useFormContext } from '../register';
import { Restante } from '../register-form/restante';
import { FormOption, FormOptionContainer } from './form-options';

export function OrderOptions() {
  const { formTotals, register } = useFormContext();
  const balance =
    Math.round((formTotals.totalSell - register.TotalAbono) * 100) / 100;
  const half = Math.round((balance / 2) * 100) / 100;

  return (
    <div className="flex flex-col gap-5">
      <Restante order={register} />
      <FormOptionContainer>
        {formTotals.totalSell - register.TotalAbono > 0 && (
          <div className="flex flex-col md:flex-row gap-3 md:items-center w-full">
            <FormOption
              label="Pagar 0% (escribir cantidad)"
              href={`/recibos/create?pedido=${register.Id}&cliente=${
                register.Id_cliente
              }&saldo=${balance}&abono=${0}`}
            >
              <Pencil className="size-5" />
            </FormOption>
            <FormOption
              label="Pagar 50% (mitad)"
              href={`/recibos/create?pedido=${register.Id}&cliente=${register.Id_cliente}&saldo=${balance}&abono=${half}`}
            >
              <Percent className="size-5" />
            </FormOption>
            <FormOption
              label="Pagar 100% (cancelar)"
              href={`/recibos/create?pedido=${register.Id}&cliente=${register.Id_cliente}&saldo=${balance}&abono=${balance}`}
            >
              <Check className="size-5" />
            </FormOption>
          </div>
        )}
        {register.TotalAbono > 0 && (
          <FormOption
            label="Recibos"
            href={`/recibos?query=${register.Id} ${register.NombreCliente}`}
          >
            <Receipt className="size-5 text-black" />
          </FormOption>
        )}
      </FormOptionContainer>
    </div>
  );
}
