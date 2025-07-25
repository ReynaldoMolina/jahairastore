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
import { FormSelect } from '@/app/ui/forms/FormInputs/formInputs';
import { useActionState } from 'react';
import { ProductPrices } from './FormInputs/ProductFormInputs';
import { createProduct, updateProduct } from '@/app/lib/actions';

export function ProductForm({ isNew, product, providersData, categoriesData }) {
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
        focus={isNew}
      />
      <FormDiv>
        <FormInput
          name="Id_shein"
          holder="Id externo"
          value={isNew ? '' : product.Id_shein}
          required={false}
        />
        <FormDate date={isNew ? '' : product.Fecha} />
      </FormDiv>
      <FormDiv flexCol={false}>
        <FormSelect
          value={isNew ? '' : product.Id_proveedor}
          name="Id_proveedor"
          data={providersData}
        />
        <FormSelect
          value={isNew ? '' : product.Id_categoria}
          name="Id_categoria"
          data={categoriesData}
        />
      </FormDiv>
      <FormInput
        name="Descripcion"
        holder="Descripción"
        value={isNew ? '' : product.Descripcion}
        required={false}
      />

      <ProductPrices isNew={isNew} product={isNew ? newProduct : product} />

      <FormError isPending={isPending} state={state} />

      <FormButtons isNew={isNew} isPending={isPending} />
    </FormContainer>
  );
}
