'use client';

import { Check, Pencil, Percent, Receipt } from 'lucide-react';
import { OrderById } from '@/types/types';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from '@/components/ui/card';
import { calculateTotals } from '@/lib/calculate-totals';
import { FormOption } from '@/components/form-element/form-option';
import { Separator } from '@/components/ui/separator';
import { roundToTwoDecimals } from '@/lib/formatters';

interface OrderPayment {
  order: OrderById;
}

export function OrderPayment({ order }: OrderPayment) {
  const formTotals = calculateTotals({
    list: order.detail,
    isOrder: true,
  });

  const balance = roundToTwoDecimals(formTotals.totalSell - order.abonos);
  const half = roundToTwoDecimals((balance / 2) * 100);
  const hasBalance = balance > 0;
  const hasAbonos = order.abonos > 0;

  return (
    <Card className="max-w-xl">
      {!hasBalance && (
        <CardHeader>
          <CardDescription>El pedido ya está pagado.</CardDescription>
        </CardHeader>
      )}
      <CardContent className="space-y-3">
        {hasBalance && (
          <>
            <FormOption
              label="Pagar 0%"
              href={`/recibos/crear?pedido=${order.id}&cliente=${
                order.idCliente
              }&saldo=${balance}&abono=${0}`}
            >
              <Pencil className="size-4" />
            </FormOption>
            <FormOption
              label="Pagar 50%"
              href={`/recibos/crear?pedido=${order.id}&cliente=${order.idCliente}&saldo=${balance}&abono=${half}`}
            >
              <Percent className="size-4" />
            </FormOption>
            <FormOption
              label="Pagar 100%"
              href={`/recibos/crear?pedido=${order.id}&cliente=${order.idCliente}&saldo=${balance}&abono=${balance}`}
            >
              <Check className="size-4" />
            </FormOption>
          </>
        )}

        {hasBalance && hasAbonos && <Separator className="my-6" />}

        {hasAbonos && (
          <FormOption
            label="Ver recibos de abonos"
            href={`/recibos?query=${order.id} ${order.nombreCliente}`}
          >
            <Receipt className="size-4" />
          </FormOption>
        )}
      </CardContent>
    </Card>
  );
}
