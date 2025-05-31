'use client';

import { FormOptionContainer, FormOption } from "@/app/ui/forms/FormOptions";
import ReceiptsIcon from "@/app/ui/forms/icons/receipts.svg";
import { useOrder } from "../forms/OrderForm";

export function OrderOptions({ order }) {
  const { orderTotals } = useOrder();
  const balance = Math.round((orderTotals.totalSell - order.TotalAbono) * 100) / 100;
  const half = Math.round((balance / 2) * 100) / 100;
  
  return (
    <FormOptionContainer>
      {(orderTotals.totalSell - order.TotalAbono) > 0 && (
        <div className="flex gap-1 items-center">
          <FormOption label="0%" href={`/receipts/create?order=${order.Id_pedido}&client=${order.Id_cliente}&balance=${half}&payment=${0}`}>
          </FormOption>
          <FormOption label="50%" href={`/receipts/create?order=${order.Id_pedido}&client=${order.Id_cliente}&balance=${balance}&payment=${half}`}>
          </FormOption>
          <FormOption label="100%" href={`/receipts/create?order=${order.Id_pedido}&client=${order.Id_cliente}&balance=${balance}&payment=${balance}`}>
          </FormOption>
        </div>
      )}
      {order.TotalAbono > 0 &&
        <FormOption label="Recibos" href={`/receipts?query=${order.Id_pedido} ${order.NombreCompleto}`}>
          <ReceiptsIcon className="size-5" />
        </FormOption>
      }
    </FormOptionContainer>
  );
}