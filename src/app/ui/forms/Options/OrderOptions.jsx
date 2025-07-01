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
        <div className="flex gap-1 items-center">
          <p className="text-xs opacity-60">Pagar:</p>
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
      )}
      {order.TotalAbono > 0 && (
        <FormOption
          label="Recibos"
          href={`/recibos?query=${order.Id} ${order.NombreCliente}`}
        >
          <ReceiptsIcon className="size-5" />
        </FormOption>
      )}
    </FormOptionContainer>
  );
}
