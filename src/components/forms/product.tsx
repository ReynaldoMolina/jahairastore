'use client';

import { createProduct, updateProduct } from '@/server-actions/actions';
import { useActionState } from 'react';
import {
  FormDiv,
  FormDate,
  FormError,
  FormButtons,
  FormInput,
  FormContainerNew,
  FormIdNew,
} from './form-inputs/form-inputs';
import { ProductPrices } from './form-inputs/product-form-inputs';
import { CardContent } from '../ui/card';
import { FieldGroup, FieldSeparator, FieldSet } from '../ui/field';

interface ProductForm {
  isNew: boolean;
  product?: any;
}

export function ProductForm({ isNew, product }: ProductForm) {
  const action = isNew ? createProduct : updateProduct.bind(null, product.Id);
  const [state, formAction, isPending] = useActionState(action, {
    message: '',
  });

  const newProduct = {
    Precio_venta: '',
    Precio_compra: '',
    Inventario: false,
    Cambio_dolar: null,
  };

  return (
    <FormContainerNew action={formAction}>
      <FormIdNew
        holder={isNew ? 'Crear producto' : 'Producto'}
        value={isNew ? '' : product.Id}
      />
      <CardContent>
        <FieldGroup>
          <FieldSet>
            <FormInput
              name="Nombre"
              holder="Nombre"
              value={isNew ? '' : product.Nombre}
              focus={isNew}
            />
          </FieldSet>
          <FieldSet>
            <ProductPrices
              isNew={isNew}
              product={isNew ? newProduct : product}
            />
          </FieldSet>
          <FieldSet>
            <FormDiv flexCol={false}>
              <FormInput
                name="Id_shein"
                holder="Id externo"
                value={isNew ? '' : product.Id_shein}
                required={false}
              />
              <FormDate date={isNew ? '' : product.Fecha} hidden />
            </FormDiv>
          </FieldSet>
        </FieldGroup>
      </CardContent>

      <FormError isPending={isPending} state={state} />

      <FormButtons isNew={isNew} isPending={isPending} />
    </FormContainerNew>
  );
}
