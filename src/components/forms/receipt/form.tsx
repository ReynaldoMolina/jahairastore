'use client';

import { FieldGroup, FieldSeparator, FieldSet } from '../../ui/field';
import { UseFormReturn } from 'react-hook-form';
import { FormInputReadOnly } from '@/components/form-elements/form-input-read-only';
import { FormTextArea } from '@/components/form-elements/form-text-area';
import { FormInput } from '@/components/form-elements/form-input';
import { receiptSchema } from '../validation/receipt';
import { FormDatePicker } from '@/components/form-elements/form-date-picker';
import z from 'zod';
import { roundToPointZeroOrFive, roundToTwoDecimals } from '@/lib/formatters';
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
  const { enCordobas, abono, cambioDolar, saldo, anulado } = form.watch();

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

      <div className={anulado ? 'hidden' : 'flex flex-col gap-6'}>
        <FieldSeparator />

        <FormCheck
          control={form.control}
          name="enCordobas"
          label="Abono en córdobas"
        />

        <FieldSet className={enCordobas ? 'hidden' : 'sm:flex-row'}>
          <FormInputReadOnly
            value={saldoInicial}
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
                roundToTwoDecimals(
                  saldoInicial - (isNaN(Number(value)) ? 0 : Number(value))
                )
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
              value={roundToTwoDecimals(saldoInicial * cambioDolar)}
              label="Saldo inicial"
              textAddon="$"
              className={bgColors.neutral}
            />
            <FormInputOnChange
              value={
                isNaN(Number(abono))
                  ? 0
                  : roundToPointZeroOrFive(abono * cambioDolar)
              }
              label="Abono"
              handleChange={(val) => {
                form.setValue(
                  'abono',
                  roundToTwoDecimals(Number(val) / cambioDolar)
                );
                form.setValue(
                  'saldo',
                  roundToTwoDecimals(
                    saldoInicial -
                      (isNaN(Number(val)) ? 0 : Number(val) / cambioDolar)
                  )
                );
              }}
              textAddon="C$"
              className={bgColors.green}
            />
            <FormInputOnChange
              value={
                isNaN(Number(saldo))
                  ? 0
                  : roundToTwoDecimals(
                      roundToTwoDecimals(saldoInicial * cambioDolar) -
                        roundToPointZeroOrFive(abono * receipt.cambioDolar)
                    )
              }
              label="Saldo"
              handleChange={() => null}
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
      </div>

      <FieldSeparator />
      <FieldSet>
        <FormCheck
          control={form.control}
          name="anulado"
          label="Anular"
          description="Marcar recibo como anulado"
          onCheckedExtra={() => {
            form.setValue('abono', 0);
            form.setValue('saldo', saldoInicial);
          }}
        />
        <FormTextArea control={form.control} name="concepto" label="Concepto" />
      </FieldSet>
    </FieldGroup>
  );
}
