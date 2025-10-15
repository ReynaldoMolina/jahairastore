'use client';

import { calculateTotals } from '@/lib/calculate-totals';
import { useFormContext } from '../../register';
import { Square, SquareCheck } from 'lucide-react';

export default function AddProduct({ product, convert }) {
  const { productList, setProductList, setFormTotals } = useFormContext();

  function addProduct() {
    const newProduct = {
      Id_producto: product.Id,
      Nombre: product.Nombre,
      Precio_venta: product.Precio_venta,
      Precio_compra: product.Precio_compra,
      Cantidad: 1,
      Cambio_dolar: product.Cambio_dolar || 1,
      Existencias: product.Existencias - 1 || 0,
    };
    setProductList([...productList, { ...newProduct }]);
    setFormTotals(calculateTotals([...productList, newProduct], convert));
  }

  function deleteProduct() {
    const newList = productList.filter((e) => e.Id_producto !== product.Id);
    setProductList(newList);
    setFormTotals(calculateTotals(newList, convert));
  }

  const isInList = productList.some((e) => e.Id_producto === product.Id);

  return (
    <button type="button">
      {isInList ? (
        <SquareCheck
          className="size-7 min-w-7 cursor-pointer"
          onClick={deleteProduct}
        />
      ) : (
        <Square
          className="size-7 min-w-7 cursor-pointer"
          onClick={addProduct}
        />
      )}
    </button>
  );
}
