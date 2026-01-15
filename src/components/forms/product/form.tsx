'use client';

import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from '../../ui/field';
import { UseFormReturn } from 'react-hook-form';
import { FormCheck } from '@/components/form-elements/form-checkbox';
import { FormInputReadOnly } from '@/components/form-elements/form-input-read-only';
import {
  formatNumber,
  roundToPointZeroOrFive,
  roundToTwoDecimals,
} from '@/lib/formatters';
import { productSchema } from '../validation/product';
import z from 'zod';
import { FormInputOnChange } from '@/components/form-elements/form-input-on-change';
import { FormTextArea } from '@/components/form-elements/form-text-area';
import { FormInput } from '@/components/form-elements/form-input';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';

interface ProductForm {
  form: UseFormReturn<z.infer<typeof productSchema>>;
}

export function ProductForm({ form }: ProductForm) {
  const {
    precioEnCordobas,
    precioVenta,
    precioVentaPorMayor,
    precioCompra,
    cambioDolar,
    imagenUrl,
  } = form.watch();

  const ganancia = precioEnCordobas
    ? (roundToPointZeroOrFive(precioVenta * cambioDolar) ?? 0) -
      (roundToTwoDecimals(precioCompra * cambioDolar) ?? 0)
    : (precioVenta ?? 0) - (precioCompra ?? 0);

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
        <FormInput control={form.control} name="fecha" label="Fecha" />
      </FieldSet>
      <FieldSet>
        <FormTextArea control={form.control} name="nombre" label="Nombre" />
        <FormInput
          control={form.control}
          name="codigo"
          label="Código de barra"
        />
      </FieldSet>
      <FieldSeparator />
      <FieldSet>
        <FieldLegend>Precios</FieldLegend>
        <FieldDescription>Ingresa los datos de precios.</FieldDescription>
        <FormCheck
          control={form.control}
          name="precioEnCordobas"
          label="Precio en córdobas"
        />
      </FieldSet>

      <div className={precioEnCordobas ? 'hidden' : 'flex flex-col gap-7'}>
        <FieldSet className="sm:flex-row">
          <FormInput
            control={form.control}
            name="precioCompra"
            label="Compra"
            textAddon="$"
          />
          <FormInput
            control={form.control}
            name="precioVenta"
            label="Venta"
            textAddon="$"
          />
          <FormInput
            control={form.control}
            name="precioVentaPorMayor"
            label="Venta por mayor"
            textAddon="$"
          />
        </FieldSet>
      </div>

      {precioEnCordobas && (
        <>
          <FieldSet className="sm:flex-row">
            <FormInputOnChange
              value={
                isNaN(Number(precioCompra))
                  ? ''
                  : roundToTwoDecimals(precioCompra * cambioDolar)
              }
              label="Compra"
              handleChange={(val) =>
                form.setValue('precioCompra', Number(val) / cambioDolar)
              }
              textAddon="C$"
            />
            <FormInputOnChange
              value={
                isNaN(Number(precioVenta))
                  ? ''
                  : roundToPointZeroOrFive(precioVenta * cambioDolar)
              }
              label="Venta"
              handleChange={(val) =>
                form.setValue('precioVenta', Number(val) / cambioDolar)
              }
              textAddon="C$"
            />
            <FormInputOnChange
              value={
                isNaN(Number(precioVentaPorMayor))
                  ? ''
                  : roundToPointZeroOrFive(precioVentaPorMayor * cambioDolar)
              }
              label="Venta por mayor"
              handleChange={(val) =>
                form.setValue('precioVentaPorMayor', Number(val) / cambioDolar)
              }
              textAddon="C$"
            />
          </FieldSet>
        </>
      )}

      <FormInputReadOnly
        value={isNaN(ganancia) ? 0 : formatNumber(ganancia)}
        label="Ganancia"
        textAddon={precioEnCordobas ? 'C$' : '$'}
      />

      <FieldSeparator />

      <FieldSet>
        <FieldLegend>Otros datos</FieldLegend>
        <FieldDescription>Datos complementarios.</FieldDescription>
        <FormInput
          control={form.control}
          name="cambioDolar"
          label="Cambio USD"
          textAddon="C$"
        />

        <div className="flex gap-1 items-end">
          <FormInput
            control={form.control}
            name="imagenUrl"
            label="Imagen (URL)"
          />
          {imagenUrl && (
            <Button variant="outline" size="icon">
              <Link href={imagenUrl}>
                <ExternalLink />
              </Link>
            </Button>
          )}
        </div>
      </FieldSet>

      {imagenUrl && (
        <div className="flex justify-center max-h-50">
          <Image
            src={imagenUrl}
            width={150}
            height={150}
            alt="Thumbnail"
            className="rounded text-xs object-contain"
          />
        </div>
      )}
    </FieldGroup>
  );
}
