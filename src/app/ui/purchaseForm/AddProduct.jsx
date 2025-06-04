'use client';

import { usePurchase } from "@/app/ui/forms/PurchaseForm";
import Unchecked from "@/app/ui/orderForm/checkbox-blank.svg";
import Checked from "@/app/ui/orderForm/checkbox-checked.svg";
import { getPurchasesTotals } from "@/app/lib/getTotals";

export default function AddProduct({ product }) {
  const { productList, setProductList, setPurchaseTotals } = usePurchase();
  
  function addProduct() {
    const newProduct = {
      Id_producto: product.Id_producto,
      Nombre: product.Nombre,
      Precio_venta: product.Precio_venta,
      Precio_compra: product.Precio_compra,
      Cantidad_compra: 1,
      Cambio_dolar: product.Cambio_dolar,
    };
    setProductList([...productList, { ...newProduct }]);
    setPurchaseTotals(getPurchasesTotals([...productList, newProduct]));
  }

  function deleteProduct() {
      const newList = productList.filter(e => e.Id_producto !== product.Id_producto);
      setProductList(newList);
      setPurchaseTotals(getPurchasesTotals(newList));
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