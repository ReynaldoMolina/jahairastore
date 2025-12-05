'use client';

import { BanknoteArrowDown, Truck } from 'lucide-react';
import { PurchaseById } from '@/types/types';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { FormOption } from '@/components/form-elements/form-option';

interface PurchaseOptions {
  purchase: PurchaseById;
}

export function PurchaseOptions({ purchase }: PurchaseOptions) {
  return (
    <Card className="max-w-xl">
      <CardHeader>
        <CardTitle className="text-sm">Gastos de la compra</CardTitle>
        <CardDescription>Selecciona un tipo de gasto.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <FormOption
          label="Agregar envío"
          href={`/gastos/crear?compra=${purchase.id}&proveedor=${purchase.idProveedor}&concepto=Envío`}
        >
          <Truck className="size-4" />
        </FormOption>
        <FormOption
          label="Agregar otro gasto"
          href={`/gastos/crear?compra=${purchase.id}&proveedor=${purchase.idProveedor}`}
        >
          <BanknoteArrowDown className="size-4" />
        </FormOption>
        {purchase.gastos > 0 && (
          <FormOption
            label="Ver lista de gastos"
            href={`/gastos?query=${purchase.id} ${purchase.nombreEmpresa}`}
          >
            <BanknoteArrowDown className="size-4" />
          </FormOption>
        )}
      </CardContent>
    </Card>
  );
}
