'use client';

import { useOrder } from "@/app/ui/forms/OrderForm";
import Unchecked from "@/app/ui/orderForm/checkbox-blank.svg";
import Checked from "@/app/ui/orderForm/checkbox-checked.svg";
import getOrderTotals from "@/app/lib/getOrderTotals";

export default function AddProduct({ product }) {
  const { productList, setProductList, setOrderTotals } = useOrder();
  
  function addProduct() {
    const newProduct = {
      Id_producto: product.Id_producto,
      Nombre: product.Nombre,
      Precio_venta: product.Precio_venta,
      Precio_compra: product.Precio_compra,
      Cantidad_venta: 1,
    };
    setProductList([...productList, { ...newProduct }]);
    setOrderTotals(getOrderTotals([...productList, newProduct]));
  }

  function deleteProduct() {
      const newList = productList.filter(e => e.Id_producto !== product.Id_producto);
      setProductList(newList);
      setOrderTotals(getOrderTotals(newList));
    }

  const isInList = productList.some(p => p.Id_producto === product.Id_producto);

  return (
    <button
      type="button"
      className="flex rounded-xl"
      >
        {isInList ?
        (
          <Checked
            className="size-7 min-w-7 hover:fill-neutral-100"
            onClick={deleteProduct}/>
        ) :
        (
          <Unchecked
            className="size-7 min-w-7 hover:fill-neutral-100"
            onClick={addProduct}/>
        )
        }
    </button>
  );
}