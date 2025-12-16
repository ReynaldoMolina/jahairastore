'use client';

import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from '../../ui/field';
import { UseFormReturn } from 'react-hook-form';
import z from 'zod';
import {
  OrderById,
  SelectOptions,
  SettingsCambioDolarType,
} from '@/types/types';
import { FormComboBox } from '@/components/form-elements/form-combo-box';
import { FormDatePicker } from '@/components/form-elements/form-date-picker';
import { FormInputReadOnly } from '@/components/form-elements/form-input-read-only';
import { formatNumber } from '@/lib/formatters';
import { calculateTotals } from '@/lib/calculate-totals';
import { orderSchema } from '../validation/order';
import { bgColors } from '@/lib/bg-colors';
import { FormSelect } from '@/components/form-elements/form-select';

interface OrderForm {
  form: UseFormReturn<z.infer<typeof orderSchema>>;
  selectOptions: SelectOptions[];
  order?: OrderById;
  isNew?: boolean;
  envioPrices?: SettingsCambioDolarType;
}

export function OrderForm({
  form,
  selectOptions,
  order,
  isNew = false,
  envioPrices,
}: OrderForm) {
  let totals = {
    totalSell: 0,
    totalCost: 0,
    profit: 0,
    quantity: 0,
    items: 0,
  };
  if (!isNew) {
    totals = calculateTotals({
      list: order.detail,
    });
  }

  return (
    <FieldGroup>
      <FieldSet>
        <FormComboBox
          control={form.control}
          name="idCliente"
          selectOptions={selectOptions}
          label="Cliente"
        />
        <FormDatePicker control={form.control} label="Fecha" name="fecha" />
      </FieldSet>
      {!isNew && (
        <>
          <FieldSeparator className="md:hidden" />
          <FieldSet className="sm:flex-row">
            <FormInputReadOnly
              value={`$ ${formatNumber(totals.totalSell)}`}
              label="Total"
              className={bgColors.neutral}
            />
            <FormInputReadOnly
              value={`$ ${formatNumber(order.abonos)}`}
              label="Abonos"
              className={bgColors.green}
            />
            <FormInputReadOnly
              value={`$ ${formatNumber(totals.totalSell - order.abonos)}`}
              label="Saldo"
              className={bgColors.red}
            />
          </FieldSet>
        </>
      )}
      {isNew && (
        <FieldSet className="flex-row">
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
            onChangeExtra={(value) => {
              if (value === 'maritimo') {
                form.setValue('precioLibra', envioPrices.envioMaritimo);
              } else {
                form.setValue('precioLibra', envioPrices.envioAereo);
              }
            }}
          />
        </FieldSet>
      )}
    </FieldGroup>
  );
}
