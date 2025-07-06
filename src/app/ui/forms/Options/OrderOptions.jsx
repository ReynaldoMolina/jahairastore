'use client';

import {
  FormOptionContainer,
  FormOption,
} from '@/app/ui/forms/Options/FormOptions';
import ReceiptsIcon from '@/app/ui/icons/receipts.svg';
import { useFormContext } from '../../forms/RegisterForm';

export function OrderOptions({ order }) {
  const { formTotals } = useFormContext();
  const balance =
    Math.round((formTotals.totalSell - order.TotalAbono) * 100) / 100;
  const half = Math.round((balance / 2) * 100) / 100;

  return (
    <FormOptionContainer>
      {formTotals.totalSell - order.TotalAbono > 0 && (
        <div className="flex flex-col md:flex-row gap-1 md:items-center">
          <p className="text-xs opacity-60 px-1">Pagar</p>
          <div className="flex gap-1 items-center">
            <FormOption
              label="0%"
              href={`/recibos/create?pedido=${order.Id}&cliente=${
                order.Id_cliente
              }&saldo=${balance}&abono=${0}`}
            ></FormOption>
            <FormOption
              label="50%"
              href={`/recibos/create?pedido=${order.Id}&cliente=${order.Id_cliente}&saldo=${balance}&abono=${half}`}
            ></FormOption>
            <FormOption
              label="100%"
              href={`/recibos/create?pedido=${order.Id}&cliente=${order.Id_cliente}&saldo=${balance}&abono=${balance}`}
            ></FormOption>
          </div>
        </div>
      )}
      {order.TotalAbono > 0 && (
        <FormOption
          label="Ver recibos"
          href={`/recibos?query=${order.Id} ${order.NombreCliente}`}
        >
          <ReceiptsIcon className="size-5" />
        </FormOption>
      )}
    </FormOptionContainer>
  );
}
