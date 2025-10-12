'use client';

import { FormButtons } from '@/components/forms/form-inputs/form-inputs';
import { ActionType, FormSelectOptions } from '@/types/types';
import { UseFormReturn, useWatch } from 'react-hook-form';
import z from 'zod';
import { getFormLabels } from '@/utils/get-form-labels';
import { productSchema } from '../validation/validation-schemas';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { DatePicker } from '@/components/date-picker';
import { FormCheckBox } from '../form-inputs/form-checkbox';
import { FormCombobox } from '../form-inputs/form-combo-box';
import { FormFieldSet } from '../form-inputs/form-field-set';
import { FormInputReadOnly } from '../form-inputs/form-input-readonly';
import { FormTextArea } from '../form-inputs/form-text-area';
import { ProductInput } from '../form-inputs/product-input-nio';
import { FormInputGroup } from '../form-inputs/form-input-group';
import { FormInput } from '../form-inputs/form-input';

type ProveedorFormValues = z.infer<typeof productSchema>;

interface ProductFormProps {
  action: ActionType;
  form: UseFormReturn<ProveedorFormValues>;
  selectOptions: FormSelectOptions;
  onSubmit: (values: ProveedorFormValues) => void;
  isPending: boolean;
}

export function ProductoForm({
  action,
  form,
  selectOptions,
  onSubmit,
  isPending,
}: ProductFormProps) {
  const { cardTitle, cardDescription } = getFormLabels({
    action,
    noun: 'm',
    formName: 'producto',
  });

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
                  options={selectOptions.providers ?? []}
                />
                <FormCombobox
                  form={form}
                  name="id_categoria"
                  label="Categoría"
                  options={selectOptions.categories ?? []}
                />
              </FormInputGroup>
            </FormFieldSet>
            <FormButtons action={action} isPending={isPending} />
          </form>
        </CardContent>
      </Card>
    </Form>
  );
}
