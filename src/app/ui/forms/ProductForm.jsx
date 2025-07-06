'use client';

import {
  FormButtons,
  FormContainer,
  FormDate,
  FormDiv,
  FormError,
  FormId,
  FormInput,
} from '@/app/ui/forms/FormInputs/formInputs';
import { useActionState } from 'react';
import { ProductPrices } from './ProductForm/ProductFormInputs';
import { createProduct, updateProduct } from '@/app/lib/actions';

export function ProductForm({ children, isNew, product }) {
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
    <FormContainer action={formAction}>
      <FormId
        holder={isNew ? 'Crear producto' : 'Producto'}
        value={isNew ? '' : product.Id}
      />
      <FormInput
        name="Nombre"
        holder="Nombre"
        value={isNew ? '' : product.Nombre}
      />
      <FormDiv>
        <FormInput
          name="Id_shein"
          holder="Id producto"
          value={isNew ? '' : product.Id_shein}
          required={false}
        />
        <FormDate date={isNew ? '' : product.Fecha} />
      </FormDiv>
      <FormDiv flexCol={false}>{children}</FormDiv>
      <FormInput
        name="Descripcion"
        holder="Descripción"
        value={isNew ? '' : product.Descripcion}
        required={false}
      />

      <ProductPrices product={isNew ? newProduct : product} />

      <FormError isPending={isPending} state={state} />

      <FormButtons link="/productos" isNew={isNew} isPending={isPending} />
    </FormContainer>
  );
}
