import {
  FormContainer,
  FormDiv,
  FormInput,
  FormButtons,
  FormDate,
  FormId,
  FormSelect,
} from '@/app/ui/forms/FormInputs/formInputs';
import { createProduct, updateProduct } from '@/app/lib/actions';
import { ProductPrices } from './ProductForm/ProductFormInputs';

export function ProductCreate() {
  const product = {
    Precio_venta: 0,
    Precio_compra: 0,
    Inventario: false,
    Cambio_dolar: null,
  };
  return (
    <FormContainer action={createProduct}>
      <FormId holder="Crear producto" />
      <FormInput name="Nombre" holder="Nombre" value="" />
      <FormDiv>
        <FormInput
          name="Id_shein"
          holder="Id SheIn"
          value=""
          required={false}
        />
        <FormDate date="" />
      </FormDiv>
      <FormDiv>
        <FormSelect value={1} name="Id_proveedor" label="Proveedor" />
        <FormSelect value={1} name="Id_categoria" label="Categoría" />
      </FormDiv>
      <FormInput
        name="Descripcion"
        holder="Descripción"
        value=""
        required={false}
      />
      <ProductPrices product={product} />
      <FormButtons link="/productos" label={'Crear'} />
    </FormContainer>
  );
}

export function ProductEdit({ product }) {
  const updateProductWithId = updateProduct.bind(null, product.Id);

  return (
    <FormContainer action={updateProductWithId}>
      <FormId holder="Producto" value={product.Id} />
      <FormInput name="Nombre" holder="Nombre" value={product.Nombre} />
      <FormDiv>
        <FormInput
          name="Id_shein"
          holder="Id SheIn"
          value={product.Id_shein}
          required={false}
        />
        <FormDate date={product.Fecha} />
      </FormDiv>
      <FormDiv>
        <FormSelect
          value={product.Id_proveedor}
          name="Id_proveedor"
          label="Proveedor"
        />
        <FormSelect
          value={product.Id_categoria}
          name="Id_categoria"
          label="Categoría"
        />
      </FormDiv>
      <FormInput
        name="Descripcion"
        holder="Descripción"
        value={product.Descripcion}
        required={false}
      />
      <ProductPrices product={product} />
      <FormButtons link="/productos" label={'Guardar'} />
    </FormContainer>
  );
}
