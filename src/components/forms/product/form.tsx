'use client';

import { FieldGroup, FieldLabel, FieldSet } from '../../ui/field';
import { ProductFormType } from '@/types/types';
import { FormInput } from '@/components/form-elements/form-input';
import { UseFormReturn } from 'react-hook-form';
import { FormCheck } from '@/components/form-elements/form-checkbox';
import { FormTextArea } from '@/components/form-elements/form-text-area';
import { FormInputReadOnly } from '@/components/form-elements/form-input-read-only';
import { formatNumber } from '@/lib/formatters';
import { Input } from '@/components/ui/input';
import { productSchema } from '../validation/product';
import z from 'zod';

interface ProductForm {
  form: UseFormReturn<z.infer<typeof productSchema>>;
  product?: ProductFormType;
}

export function ProductForm({ form }: ProductForm) {
  const { precioEnCordobas, precioVenta, precioCompra, cambioDolar } =
    form.watch();

  const ganancia = (precioVenta ?? 0) - (precioCompra ?? 0);
  const gananciaEnCordobas = ganancia * cambioDolar;

  return (
    <FieldGroup>
      <FieldSet className="hidden">
        <FormInput
          control={form.control}
          name="idProveedor"
          label="Id proveedor"
        />
        <FormInput
          control={form.control}
          name="descripcion"
          label="Descripción"
        />
        <FormInput
          control={form.control}
          name="idCategoria"
          label="Id categoría"
        />
        <FormInput control={form.control} name="fecha" label="Fecha" />
      </FieldSet>
      <FieldSet>
        <FormInput control={form.control} name="nombre" label="Nombre" />
      </FieldSet>
      <FieldSet>
        <FormCheck
          control={form.control}
          name="precioEnCordobas"
          label="¿Precio en córdobas?"
          description="Se mostrará el precio en córdobas en las listas."
        />
      </FieldSet>

      <FieldSet
        className={precioEnCordobas ? 'hidden' : 'gap-3 md:gap-6 flex-row'}
      >
        <FormInput
          control={form.control}
          name="precioCompra"
          label="Compra $"
        />
        <FormInput control={form.control} name="precioVenta" label="Venta $" />
        <FormInputReadOnly value={formatNumber(ganancia)} label="Ganancia $" />
      </FieldSet>

      {precioEnCordobas && (
        <FieldSet className="flex-row gap-3 md:gap-6">
          <FormInputNio
            value={precioCompra * cambioDolar}
            label="Compra C$"
            handleChange={(val) =>
              form.setValue('precioCompra', Number(val) / cambioDolar)
            }
          />
          <FormInputNio
            value={precioVenta * cambioDolar}
            label="Venta C$"
            handleChange={(val) =>
              form.setValue('precioVenta', Number(val) / cambioDolar)
            }
          />
          <FormInputReadOnly
            value={formatNumber(gananciaEnCordobas)}
            label="Ganancia C$"
          />
        </FieldSet>
      )}

      <FieldSet className="flex-row gap-3 md:gap-6">
        <FormInput
          control={form.control}
          name="cambioDolar"
          label="Cambio dólar"
        />
        <FormInput control={form.control} name="idShein" label="Id externo" />
      </FieldSet>
    </FieldGroup>
  );
}

interface FormInputNio {
  value: number | string;
  label: string;
  handleChange: (value: string) => void;
}

function FormInputNio({ value, label, handleChange }: FormInputNio) {
  return (
    <div className="flex flex-col w-full gap-3">
      <FieldLabel>{label}</FieldLabel>
      <Input
        placeholder={label}
        value={isNaN(Number(value)) ? '' : value}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
}
