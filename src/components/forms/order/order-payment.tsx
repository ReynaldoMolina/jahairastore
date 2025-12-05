'use client';

import { Check, Pencil, Percent, Receipt } from 'lucide-react';
import { OrderById } from '@/types/types';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { calculateTotals } from '@/lib/calculate-totals';
import { FormOption } from '@/components/form-elements/form-option';
import { FormDescription } from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';

interface OrderPayment {
  order: OrderById;
}

export function OrderPayment({ order }: OrderPayment) {
  const formTotals = calculateTotals({
    list: order.detail,
  });
  const balance = Math.round((formTotals.totalSell - order.abonos) * 100) / 100;
  const half = Math.round((balance / 2) * 100) / 100;

  return (
    <Card className="max-w-xl">
      <CardHeader>
        <CardTitle className="text-sm">Pagar pedido</CardTitle>
        <CardDescription>Crea recibos para pagar el pedido.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {formTotals.totalSell - order.abonos > 0 && (
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
        {order.abonos > 0 && (
          <>
            <Separator className="my-6" />
            <FormOption
              label="Ver recibos de abonos"
              href={`/recibos?query=${order.id} ${order.nombreCliente}`}
            >
              <Receipt className="size-4" />
            </FormOption>
          </>
        )}
      </CardContent>
    </Card>
  );
}
