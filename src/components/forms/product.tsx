'use client';

import {
  FormButtons,
  FormError,
} from '@/components/forms/form-inputs/form-inputs';
import { startTransition, useActionState } from 'react';
import { ActionType, ProductsFormType, SelectOptions } from '@/types/types';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { productSchema } from './validation/validation-schemas';
import z from 'zod';
import { Form, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { FormInputGroup } from './form-inputs/form-input-group';
import { FormTextArea } from './form-inputs/form-text-area';
import { getFormLabels } from '@/utils/get-form-labels';
import { FormInput } from './form-inputs/form-input';
import { DatePicker } from '../date-picker';
import { FormCombobox } from './form-inputs/form-combo-box';
import { getCurrentDate } from '@/utils/get-current-date';
import { FormCheckBox } from './form-inputs/form-checkbox';
import { FormInputReadOnly } from './form-inputs/form-input-readonly';
import { createProduct, updateProduct } from '@/server-actions/products';
import { FormFieldSet } from './form-inputs/form-field-set';
import { ProductInput } from './form-inputs/product-input-nio';

interface ProductFormProps {
  action: ActionType;
  product?: ProductsFormType;
  selectOptions: {
    providers: SelectOptions;
    categories: SelectOptions;
  };
  cambioDolarConfig: number;
}

export function ProductForm({
  action,
  product,
  selectOptions,
  cambioDolarConfig,
}: ProductFormProps) {
  const currentDate = getCurrentDate();

  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: product
      ? {
          id_proveedor: product.id_proveedor ?? undefined,
          nombre_producto: product.nombre_producto ?? '',
          precio_compra: product.precio_compra ?? 0,
          precio_venta: product.precio_venta ?? 0,
          cambio_dolar: product.cambio_dolar ?? cambioDolarConfig,
          id_categoria: product.id_categoria ?? undefined,
          fecha: product.fecha ?? '',
          id_externo: product.id_externo ?? null,
          inventario: product.inventario ?? false,
          precio_en_cordobas: product.precio_en_cordobas ?? false,
        }
      : {
          id_proveedor: 1,
          nombre_producto: '',
          precio_compra: 0,
          precio_venta: 0,
          cambio_dolar: cambioDolarConfig,
          id_categoria: 1,
          fecha: currentDate,
          id_externo: null,
          inventario: false,
          precio_en_cordobas: false,
        },
  });

  const newAction =
    action === 'create' ? createProduct : updateProduct.bind(null, product?.id);

  const [state, formAction, isPending] = useActionState(newAction, {
    message: '',
  });

  function onSubmit(values: z.infer<typeof productSchema>) {
    startTransition(() => {
      formAction(values);
    });
  }

  const { cardTitle, cardDescription } = getFormLabels(action, 'm', 'producto');

  const [precioEnCordobas, precioVenta, precioCompra, cambioDolar] = useWatch({
    control: form.control,
    name: [
      'precio_en_cordobas',
      'precio_venta',
      'precio_compra',
      'cambio_dolar',
    ],
  });

  return (
    <Form {...form}>
      <Card className="mx-auto max-w-2xl w-full">
        <CardHeader className="border-b">
          <CardTitle>{cardTitle}</CardTitle>
          <CardDescription>{cardDescription}</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            <FormTextArea
              control={form.control}
              name="nombre_producto"
              label="Nombre del producto"
            />
            <FormCheckBox
              control={form.control}
              name="inventario"
              label="¿Agregar al inventario?"
            />
            <FormCheckBox
              control={form.control}
              name="precio_en_cordobas"
              label="¿Precio en córdobas?"
            />
            <FormInputGroup rowInMobile hidden={precioEnCordobas}>
              <FormInput
                control={form.control}
                name="precio_compra"
                label="Compra $"
                type="number"
                disabled={precioEnCordobas}
              />
              <FormInput
                control={form.control}
                name="precio_venta"
                label="Venta $"
                type="number"
                disabled={precioEnCordobas}
              />
              <FormInputReadOnly
                label="Ganancia $"
                type="number"
                value={Number(precioVenta) - Number(precioCompra)}
              />
            </FormInputGroup>
            <FormInputGroup rowInMobile hidden={!precioEnCordobas}>
              <ProductInput
                defaultValue={String(precioCompra * cambioDolar)}
                label="Compra C$"
                disabled={!precioEnCordobas}
                updateField={(value) => {
                  form.setValue('precio_compra', Number(value) / cambioDolar);
                }}
              />
              <ProductInput
                defaultValue={String(precioVenta * cambioDolar)}
                label="Venta C$"
                disabled={!precioEnCordobas}
                updateField={(value) => {
                  form.setValue('precio_venta', Number(value) / cambioDolar);
                }}
              />
              <FormInputReadOnly
                label="Ganancia C$"
                type="number"
                value={
                  (Number(precioVenta) - Number(precioCompra)) * cambioDolar
                }
              />
            </FormInputGroup>
            <FormInput
              control={form.control}
              name="cambio_dolar"
              label="Cambio dólar"
              type="number"
              hidden={!precioEnCordobas}
            />
            <FormFieldSet name="moreinfo">
              <FormInputGroup rowInMobile>
                <FormInput
                  control={form.control}
                  name="id_externo"
                  label="Id externo"
                />
                <FormField
                  control={form.control}
                  name="fecha"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Fecha agregado</FormLabel>
                      <DatePicker field={field} />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </FormInputGroup>
              <FormInputGroup>
                <FormCombobox
                  form={form}
                  name="id_proveedor"
                  label="Proveedor"
                  options={selectOptions.providers}
                />
                <FormCombobox
                  form={form}
                  name="id_categoria"
                  label="Categoría"
                  options={selectOptions.categories}
                />
              </FormInputGroup>
            </FormFieldSet>
            <FormError isPending={isPending} state={state} />
            <FormButtons action={action} isPending={isPending} />
          </form>
        </CardContent>
      </Card>
    </Form>
  );
}
