'use client';

import React, { startTransition, useActionState } from 'react';
import { formatNumber } from '@/lib/formatters';
import { Copy, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { calculateTotals } from '@/lib/calculate-totals';
import {
  OrderById,
  OrderFormType,
  SettingsCambioDolarType,
} from '@/types/types';
import { useForm } from 'react-hook-form';
import { orderSchema } from '../validation/order';
import { useServerActionFeedback } from '@/hooks/use-server-status';
import { stateDefault } from '@/server-actions/stateMessage';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import { updateOrder } from '@/server-actions/order';
import { toast } from 'sonner';
import { FormInput } from '@/components/form-elements/form-input';
import { Card, CardContent } from '@/components/ui/card';
import { FieldGroup, FieldSet } from '@/components/ui/field';
import { FormSelect } from '@/components/form-elements/form-select';
import { FormCardFooter } from '@/components/form-elements/form-footer';
import { Form } from '@/components/ui/form';

interface OrderShipping {
  order: OrderById;
  envioPrices: SettingsCambioDolarType;
}

export function OrderShipping({ order, envioPrices }: OrderShipping) {
  const formTotals = calculateTotals({
    list: order.detail,
  });

  const form = useForm<z.infer<typeof orderSchema>>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      idCliente: order.idCliente,
      fecha: order.fecha,
      peso: order.peso,
      precioLibra: order.precioLibra,
      cambioDolar: order.cambioDolar,
      tipoEnvio: order.tipoEnvio,
    },
  });

  const [state, formAction, isPending] = useActionState(
    updateOrder,
    stateDefault
  );

  function onSubmit(values: z.infer<typeof orderSchema>) {
    startTransition(() => {
      formAction({ id: order.id, values: values as OrderFormType });
    });
  }

  useServerActionFeedback(state, { refresh: true });

  const { peso, precioLibra, cambioDolar } = form.watch();

  const saldo = formTotals.totalSell - order.abonos;
  const orderPeso = isNaN(Number(peso)) ? 0 : Number(peso);
  const orderEnvio = orderPeso * Number(precioLibra);
  const orderRestanteTotal = orderEnvio + saldo;

  const orderRestanteTotalCordobas = orderRestanteTotal * cambioDolar;

  const message =
    `Hola ${order.nombreCliente}, ya está tu pedido listo para entregar 🥰.\n` +
    `El paquete pesó ${formatNumber(
      orderPeso,
      3
    )} libras, en dólares $${formatNumber(orderEnvio)}.\n` +
    `${
      saldo > 0
        ? `El restante es de $${formatNumber(
            saldo
          )}.\nEn total *$${formatNumber(
            orderRestanteTotal
          )}* en córdobas *C$${formatNumber(orderRestanteTotalCordobas)}* 🥰`
        : `En córdobas *C$${formatNumber(orderRestanteTotalCordobas)}* 🥰`
    }`;

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(message);
      toast.info('Mensaje copiado al portapapeles.');
    } catch (err) {
      console.error('Failed to copy text: ', err);
      toast.error('No se pudo copiar el mensaje.');
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-xl w-full">
        <Card className="max-w-xl mx-auto">
          <CardContent className="space-y-5">
            <FieldGroup>
              <FieldSet>
                <FormSelect
                  control={form.control}
                  name="tipoEnvio"
                  label="Tipo de envío"
                  options={[
                    {
                      value: 'maritimo',
                      label: 'Marítimo',
                    },
                    {
                      value: 'aereo',
                      label: 'Aéreo',
                    },
                  ]}
                  onChangeExtra={(value) =>
                    form.setValue(
                      'precioLibra',
                      value === 'maritimo'
                        ? envioPrices.envioMaritimo
                        : envioPrices.envioAereo
                    )
                  }
                />
                <FormInput
                  control={form.control}
                  name="cambioDolar"
                  label="Cambio USD"
                  textAddon="C$"
                />
              </FieldSet>
              <FieldSet className="flex-row gap-3">
                <FormInput
                  control={form.control}
                  name="peso"
                  label="Peso"
                  textAddon="Lb"
                />
                <FormInput
                  control={form.control}
                  name="precioLibra"
                  label="Precio libra"
                  textAddon="$"
                />
              </FieldSet>
            </FieldGroup>
            <Card className="bg-green-200 dark:bg-green-800 py-1 px-2">
              <CardContent className="p-1">
                <p className="text-xs text-center">{`Hola ${order.nombreCliente}, ya está tu pedido listo para entregar 🥰.`}</p>
                <p className="text-xs text-center">{`El paquete pesó ${formatNumber(
                  orderPeso,
                  3
                )} libras, en dólares $${formatNumber(orderEnvio)}.`}</p>

                {saldo > 0 && (
                  <p className="text-xs text-center">{`El restante es de $${formatNumber(
                    saldo
                  )}.`}</p>
                )}

                {saldo > 0 ? (
                  <p className="text-xs text-center">
                    En total <b>${formatNumber(orderRestanteTotal)}</b>, en
                    córdobas <b>C${formatNumber(orderRestanteTotalCordobas)}</b>{' '}
                    🥰
                  </p>
                ) : (
                  <p className="text-xs text-center">
                    En córdobas{' '}
                    <b>C$ {formatNumber(orderRestanteTotalCordobas)}</b> 🥰
                  </p>
                )}
              </CardContent>
            </Card>
            <div className="inline-flex gap-3 w-full justify-center">
              <Button
                type="button"
                variant="outline"
                onClick={handleCopyToClipboard}
              >
                <Copy />
                Copiar
              </Button>
              {order.telefono && (
                <WhatsAppButton message={message} phoneNumber={order.telefono}>
                  <MessageCircle className="size-4" />
                </WhatsAppButton>
              )}
            </div>
          </CardContent>
          <FormCardFooter isPending={isPending} />
        </Card>
      </form>
    </Form>
  );
}

interface WhatsAppButton {
  children: React.ReactNode;
  message: string;
  phoneNumber: string;
}

function WhatsAppButton({ children, message, phoneNumber }: WhatsAppButton) {
  const encodedMessage = encodeURIComponent(message);
  const formattedPhoneNumber = phoneNumber.replace(/\D/g, '');
  const whatsAppUrl = `https://api.whatsapp.com/send?phone=${formattedPhoneNumber}&text=${encodedMessage}`;

  return (
    <Button type="button" variant="outline" asChild>
      <Link href={whatsAppUrl} target="_blank" rel="noopener noreferrer">
        {children}
        <label className="text-xs">Enviar</label>
      </Link>
    </Button>
  );
}
