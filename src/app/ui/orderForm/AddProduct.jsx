'use client';

import { useOrder } from "./OrderDetail";
import Add from "@/app/ui/actiontools/add.svg";
import getOrderTotals from "@/app/lib/getOrderTotals";

export default function AddProduct({ product }) {
  const { productList, setProductList, setOrderTotals } = useOrder();
  
  function addProduct() {
    const newProduct = {
      Id_producto: product.Id_producto,
      Nombre: product.Nombre,
      Precio_venta: product.Precio_venta,
      Precio_compra: product.Precio_compra,
      quantity: 1,
    };
    setProductList([...productList, { ...newProduct }]);
    setOrderTotals(getOrderTotals([...productList, newProduct]));
  }

  const isInList = productList.some(p => p.Id_producto === product.Id_producto);

  return (
    <button
      type="button"
      className={`flex rounded-xl ${isInList ? "cursor-not-allowed" : "cursor-pointer"}`}
      onClick={() => {
        if (!isInList) {
          addProduct();
        } else {
          alert('El producto ya está agregado');
        }
      }}
      >
        <Add className={`size-7 min-w-7 ${isInList ? "fill-neutral-200 dark:fill-neutral-700" : "hover:fill-green-600"}`} />
    </button>
  );
}