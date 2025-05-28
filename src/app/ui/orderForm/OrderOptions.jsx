'use client';

import { FormOptionContainer, FormOption } from "@/app/ui/forms/FormOptions";
import PayIcon from "@/app/ui/forms/icons/payment.svg";
import ReceiptsIcon from "@/app/ui/forms/icons/receipts.svg";
import { useOrder } from "../forms/OrderForm";

export function OrderOptions({ order }) {
  const { orderTotals } = useOrder();
  const balance = Math.round((orderTotals.totalSell - order.TotalAbono) * 100) / 100;
  
  return (
    <FormOptionContainer>
      {(orderTotals.totalSell - order.TotalAbono) > 0 &&
        <FormOption label="Pagar" href={`/receipts/create?order=${order.Id_pedido}&client=${order.Id_cliente}&balance=${balance}`}>
          <PayIcon className="size-5" />
        </FormOption>
      }
      {order.TotalAbono > 0 &&
        <FormOption label="Recibos" href={`/receipts?query=${order.Id_pedido} ${order.NombreCompleto}`}>
          <ReceiptsIcon className="size-5" />
        </FormOption>
      }
    </FormOptionContainer>
  );
}