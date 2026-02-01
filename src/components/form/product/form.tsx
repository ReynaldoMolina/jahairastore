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
import { UploadImage } from './upload-image';
import { ButtonGroup } from '@/components/ui/button-group';
import { DeleteImage } from './delete-image';
import { FormSelect } from '@/components/form-element/form-select';
import { SelectOptions } from '@/types/types';

interface ProductForm {
  form: UseFormReturn<z.infer<typeof productSchema>>;
  productId?: number;
  categories: SelectOptions[];
}

export function ProductForm({ form, productId, categories }: ProductForm) {
  const [open, setOpen] = useState(false);
  const {
    precioEnDolares,
    precioVenta,
    precioVentaPorMayor,
    costo,
    cambioDolar,
    imagenUrl,
  } = form.watch();

  const ganancia = precioEnDolares
    ? (roundToPointZeroOrFive(precioVenta / cambioDolar) ?? 0) -
      (roundToTwoDecimals(costo / cambioDolar) ?? 0)
    : (precioVenta ?? 0) - (costo ?? 0);

  return (
    <FieldGroup>
      <FieldSet className="hidden">
        <FormInput
          control={form.control}
          name="idProveedor"
          label="Id proveedor"
        />
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
          name="precioEnDolares"
          label="Precio en dólares"
        />
      </FieldSet>

      <FormInput
        control={form.control}
        name="costo"
        label="Precio compra"
        textAddon="C$"
        readOnly
        hidden={precioEnDolares}
        description="Se calcula al momento de hacer una compra."
      />
      <FieldSet className="sm:flex-row" hidden={precioEnDolares}>
        <FormInput
          control={form.control}
          name="precioVenta"
          label="Precio venta"
          textAddon="C$"
        />
        <FormInput
          control={form.control}
          name="precioVentaPorMayor"
          label="Venta por mayor"
          textAddon="C$"
        />
      </FieldSet>

      {precioEnDolares && (
        <>
          <FormInputReadOnly
            value={
              isNaN(Number(costo))
                ? ''
                : roundToTwoDecimals(costo / cambioDolar)
            }
            label="Precio compra"
            textAddon="$"
            description="Se calcula al momento de hacer una compra."
          />
          <FieldSet className="sm:flex-row">
            <FormInputOnChange
              value={
                isNaN(Number(precioVenta))
                  ? ''
                  : roundToPointZeroOrFive(precioVenta / cambioDolar)
              }
              label="Precio venta"
              handleChange={(val) =>
                form.setValue('precioVenta', Number(val) * cambioDolar)
              }
              textAddon="$"
            />
            <FormInputOnChange
              value={
                isNaN(Number(precioVentaPorMayor))
                  ? ''
                  : roundToPointZeroOrFive(precioVentaPorMayor / cambioDolar)
              }
              label="Venta por mayor"
              handleChange={(val) =>
                form.setValue('precioVentaPorMayor', Number(val) / cambioDolar)
              }
              textAddon="$"
            />
          </FieldSet>
        </>
      )}

      <FieldSet>
        <FormInputReadOnly
          value={isNaN(ganancia) ? 0 : formatNumber(ganancia)}
          label="Ganancia"
          textAddon={precioEnDolares ? '$' : 'C$'}
        />
        <FormInput
          control={form.control}
          name="cambioDolar"
          label="Cambio USD"
          textAddon="C$"
          hidden={!precioEnDolares}
        />
      </FieldSet>

      <FieldSeparator />

      <FieldSet>
        <FieldLegend>Otra información</FieldLegend>
        <FieldDescription>
          Otros datos necesarios del producto.
        </FieldDescription>

        <FormSelect
          control={form.control}
          name="idCategoria"
          label="Categoría"
          options={categories}
        />

        <div className="flex gap-1 items-end">
          <FormInput
            control={form.control}
            name="imagenUrl"
            label="Imagen"
            placeholder="Url / link"
          />
          <ButtonGroup>
            <UploadImage form={form} productId={productId} />
            <DeleteImage form={form} productId={productId} />
            <Button
              variant="outline"
              size="icon"
              asChild={!!imagenUrl}
              type="button"
              disabled={!imagenUrl}
            >
              {imagenUrl ? (
                <Link href={imagenUrl} target="_blank">
                  <ExternalLink />
                </Link>
              ) : (
                <ExternalLink />
              )}
            </Button>
          </ButtonGroup>
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
