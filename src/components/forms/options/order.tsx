'use client';

import { Receipt } from 'lucide-react';
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
          <div className="flex flex-col md:flex-row gap-1 md:items-center">
            <p className="text-xs opacity-60 px-1">Pagar</p>
            <div className="flex gap-1 items-center">
              <FormOption
                label="0%"
                href={`/recibos/create?pedido=${register.Id}&cliente=${
                  register.Id_cliente
                }&saldo=${balance}&abono=${0}`}
              >
                <p></p>
              </FormOption>
              <FormOption
                label="50%"
                href={`/recibos/create?pedido=${register.Id}&cliente=${register.Id_cliente}&saldo=${balance}&abono=${half}`}
              >
                <p></p>
              </FormOption>
              <FormOption
                label="100%"
                href={`/recibos/create?pedido=${register.Id}&cliente=${register.Id_cliente}&saldo=${balance}&abono=${balance}`}
              >
                <p></p>
              </FormOption>
            </div>
          </div>
        )}
        {register.TotalAbono > 0 && (
          <FormOption
            label="Ver recibos"
            href={`/recibos?query=${register.Id} ${register.NombreCliente}`}
          >
            <Receipt className="size-5" />
          </FormOption>
        )}
      </FormOptionContainer>
    </div>
  );
}
