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
import { FormCheck } from '@/components/form-elements/form-checkbox';
import { FormInputOnChange } from '@/components/form-elements/form-input-on-change';

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
  const { enCordobas, abono, cambioDolar, saldo } = form.watch();

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

      <FieldSeparator />

      {/* <FormCheck
        control={form.control}
        name="enCordobas"
        label="¿Abono en córdobas?"
        description="Se mostrará el abono en córdobas."
      /> */}

      <FieldSet className={enCordobas ? 'hidden' : 'sm:flex-row'}>
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

      {enCordobas && (
        <FieldSet className="sm:flex-row">
          <FormInputReadOnly
            value={formatNumber(saldoInicial * cambioDolar)}
            label="Saldo inicial"
            textAddon="$"
            className={bgColors.neutral}
          />
          <FormInputOnChange
            value={isNaN(Number(abono)) ? '' : abono * cambioDolar}
            label="Abono"
            handleChange={(val) => {
              form.setValue('abono', Number(val) / cambioDolar);
              form.setValue(
                'saldo',
                saldoInicial -
                  (isNaN(Number(val)) ? 0 : Number(val) / cambioDolar)
              );
            }}
            textAddon="C$"
            className={bgColors.green}
          />
          <FormInputOnChange
            value={isNaN(Number(saldo)) ? '' : saldo * cambioDolar}
            label="Saldo"
            handleChange={(val) =>
              form.setValue('saldo', Number(val) / cambioDolar)
            }
            textAddon="C$"
            className={bgColors.red}
            readOnly
          />
        </FieldSet>
      )}

      <FormInput
        control={form.control}
        name="cambioDolar"
        label="Cambio USD"
        textAddon="C$"
      />

      <FieldSeparator />

      <FieldSet>
        <FormTextArea control={form.control} name="concepto" label="Concepto" />
      </FieldSet>
    </FieldGroup>
  );
}
