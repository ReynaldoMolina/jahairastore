'use client';

import { FieldGroup, FieldSeparator, FieldSet } from '../../ui/field';
import { UseFormReturn } from 'react-hook-form';
import { FormInputReadOnly } from '@/components/form-elements/form-input-read-only';
import { FormTextArea } from '@/components/form-elements/form-text-area';
import { FormInput } from '@/components/form-elements/form-input';
import { receiptSchema } from '../validation/receipt';
import { FormDatePicker } from '@/components/form-elements/form-date-picker';
import z from 'zod';
import { formatNumber } from '@/lib/formatters';
import { bgColors } from '@/lib/bg-colors';
import { ReceiptById } from '@/types/types';

interface ReceiptForm {
  form: UseFormReturn<z.infer<typeof receiptSchema>>;
  receipt?: ReceiptById;
  nombreCliente?: string;
  saldoInicial?: number;
}

export function ReceiptForm({
  form,
  receipt,
  nombreCliente,
  saldoInicial,
}: ReceiptForm) {
  return (
    <FieldGroup>
      <FieldSet className="flex-row gap-3 md:gap-6">
        <FormInput
          control={form.control}
          name="idPedido"
          label="Id pedido"
          textAddon="#"
          readOnly
        />
        <FormDatePicker control={form.control} name="fecha" label="Fecha" />
      </FieldSet>
      <FieldSet>
        <FormInputReadOnly
          value={
            receipt
              ? `${receipt.nombreCliente} ${receipt.apellidoCliente}`
              : nombreCliente
          }
          label="Cliente"
        />
      </FieldSet>

      <FieldSeparator className="md:hidden" />

      <FieldSet className="md:flex-row">
        <FormInputReadOnly
          value={formatNumber(saldoInicial)}
          label="Saldo inicial"
          textAddon="$"
          className={bgColors.neutral}
        />
        <FormInput
          control={form.control}
          name="abono"
          label="Abono"
          textAddon="$"
          className={bgColors.green}
          onChangeExtra={(value) =>
            form.setValue(
              'saldo',
              saldoInicial - (isNaN(Number(value)) ? 0 : Number(value))
            )
          }
        />
        <FormInput
          control={form.control}
          name="saldo"
          label="Saldo"
          textAddon="$"
          className={bgColors.red}
          readOnly
        />
      </FieldSet>

      <FieldSeparator className="md:hidden" />

      <FieldSet>
        <FormTextArea control={form.control} name="concepto" label="Concepto" />
      </FieldSet>
    </FieldGroup>
  );
}
