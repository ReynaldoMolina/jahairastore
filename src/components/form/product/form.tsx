'use client';

import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from '../../ui/field';
import { UseFormReturn } from 'react-hook-form';
import { FormCheck } from '@/components/form-element/form-checkbox';
import { FormInputReadOnly } from '@/components/form-element/form-input-read-only';
import {
  formatNumber,
  roundToPointZeroOrFive,
  roundToTwoDecimals,
} from '@/lib/formatters';
import { productSchema } from '../validation/product';
import z from 'zod';
import { FormInputOnChange } from '@/components/form-element/form-input-on-change';
import { FormTextArea } from '@/components/form-element/form-text-area';
import { FormInput } from '@/components/form-element/form-input';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ExternalLink, ScanBarcode } from 'lucide-react';
import { BarcodeScanner } from '@/components/barcode-scanner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useState } from 'react';

interface ProductForm {
  form: UseFormReturn<z.infer<typeof productSchema>>;
}

export function ProductForm({ form }: ProductForm) {
  const [open, setOpen] = useState(false);
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
        <div className="inline-flex gap-1 items-end">
          <FormInput
            control={form.control}
            name="codigo"
            label="Código de barra"
          />
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="icon">
                <ScanBarcode />
              </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Escanear producto</DialogTitle>
                <DialogDescription>
                  Enfoca el código de barra en el centro
                </DialogDescription>
              </DialogHeader>

              <BarcodeScanner
                onScan={(value) => {
                  form.setValue('codigo', value);
                  setOpen(false);
                }}
              />
            </DialogContent>
          </Dialog>
        </div>
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
        <FormInput
          control={form.control}
          name="precioCompra"
          label="Precio compra"
          textAddon="$"
          readOnly
          description="Se calcula al momento de ingresar una compra."
        />
        <FieldSet className="sm:flex-row">
          <FormInput
            control={form.control}
            name="precioVenta"
            label="Precio venta"
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
          <FormInputOnChange
            value={
              isNaN(Number(precioCompra))
                ? ''
                : roundToTwoDecimals(precioCompra * cambioDolar)
            }
            label="Precio compra"
            handleChange={(val) =>
              form.setValue('precioCompra', Number(val) / cambioDolar)
            }
            textAddon="C$"
            readOnly
            description="Se calcula al momento de hacer una compra."
          />
          <FieldSet className="sm:flex-row">
            <FormInputOnChange
              value={
                isNaN(Number(precioVenta))
                  ? ''
                  : roundToPointZeroOrFive(precioVenta * cambioDolar)
              }
              label="Precio venta"
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

      <FieldSet>
        <FormInputReadOnly
          value={isNaN(ganancia) ? 0 : formatNumber(ganancia)}
          label="Ganancia"
          textAddon={precioEnCordobas ? 'C$' : '$'}
        />
        <FormInput
          control={form.control}
          name="cambioDolar"
          label="Cambio USD"
          textAddon="C$"
        />
      </FieldSet>

      <FieldSeparator />

      <FieldSet>
        <FieldLegend>Imagen</FieldLegend>
        <FieldDescription>
          Ingresa la url de la imagen del producto.
        </FieldDescription>

        <div className="flex gap-1 items-end">
          <FormInput control={form.control} name="imagenUrl" label="URL" />
          {imagenUrl && (
            <Button variant="outline" size="icon" asChild type="button">
              <Link href={imagenUrl} target="_blank">
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
