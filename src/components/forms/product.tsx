'use client';

import {
  FormButtons,
  FormError,
} from '@/components/forms/form-inputs/form-inputs';
import { startTransition, useActionState } from 'react';
import { ActionType, ProductsFormType, SelectOptions } from '@/types/types';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { productSchema } from './schemas/form-schemas';
import z from 'zod';
import { Form, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import FormInputGroup from './form-inputs/form-input-group';
import FormTextArea from './form-inputs/form-text-area';
import { getFormLabels } from '@/utils/get-form-labels';
import FormInput from './form-inputs/form-input';
import { DatePicker } from '../date-picker';
import FormCombobox from './form-inputs/form-combo-box';
import { getCurrentDate } from '@/utils/get-current-date';
import FormCheckBox from './form-inputs/form-checkbox';
import FormInputReadOnly from './form-inputs/form-input-readonly';
import { createProduct, updateProduct } from '@/server-actions/products';

interface ProductFormProps {
  action: ActionType;
  product?: ProductsFormType;
  selectOptions: {
    providers: SelectOptions[];
    categories: SelectOptions[];
  };
}

export function ProductForm({
  action,
  product,
  selectOptions,
}: ProductFormProps) {
  const currentDate = getCurrentDate();

  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: product
      ? {
          id_proveedor: product.id_proveedor ?? undefined,
          nombre: product.nombre ?? '',
          precio_compra: product.precio_compra ?? 0,
          precio_venta: product.precio_venta ?? 0,
          id_categoria: product.id_categoria ?? undefined,
          fecha: product.fecha ?? '',
          id_externo: product.id_externo ?? null,
          inventario: product.inventario ?? false,
        }
      : {
          id_proveedor: 1,
          nombre: '',
          precio_compra: 0,
          precio_venta: 0,
          id_categoria: 1,
          fecha: currentDate,
          id_externo: null,
          inventario: false,
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

  const [inventario, precioVenta, precioCompra] = useWatch({
    control: form.control,
    name: ['inventario', 'precio_venta', 'precio_compra'],
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
              name="nombre"
              label="Nombre producto"
            />
            <FormCheckBox
              control={form.control}
              name="inventario"
              label="Agregar al inventario"
            />
            <FormInputGroup>
              <FormInput
                control={form.control}
                name="precio_compra"
                label="Precio compra"
                type="number"
              />
              <FormInput
                control={form.control}
                name="precio_venta"
                label="Precio venta"
                type="number"
              />
              <FormInputReadOnly
                label="Ganancia"
                type="number"
                value={Number(precioVenta) - Number(precioCompra)}
              />
            </FormInputGroup>
            <FormInputGroup>
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
            <FormError isPending={isPending} state={state} />
            <FormButtons action={action} isPending={isPending} />
          </form>
        </CardContent>
      </Card>
    </Form>
  );
}
