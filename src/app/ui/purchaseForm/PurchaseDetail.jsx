'use client';

import { ProductCard } from "@/app/ui/purchaseForm/ProductCard";
import CardDelete from "@/app/ui/purchaseForm/delete.svg";
import { getPurchasesTotals } from "@/app/lib/getTotals";
import { usePurchase } from "@/app/ui/forms/PurchaseForm";

export default function PurchaseDetail() {
  const { productList, setProductList, purchaseTotals, setPurchaseTotals } = usePurchase();

  function findId(product) {
    const index = productList.findIndex((e) => e.Id_producto === product.Id_producto);
    return index;
  }

  function addQuantity(product) {
    const newList = productList.map((item, idx) =>
      idx === findId(product) ? { ...item, Cantidad_compra: item.Cantidad_compra + 1 } : item
    )
    setProductList(newList);
    setPurchaseTotals(getPurchasesTotals(newList));
  }

  function reduceQuantity(product) {
    const newList = productList.map((item, idx) =>
      idx === findId(product) ? { ...item, Cantidad_compra: item.Cantidad_compra - 1 } : item
    )
    setProductList(newList);
    setPurchaseTotals(getPurchasesTotals(newList));
  }

  function deleteProduct(product) {
    const newList = productList.filter(e => e.Id_producto !== product.Id_producto);
    setProductList(newList);
    setPurchaseTotals(getPurchasesTotals(newList));
  }

  return (
    <>
      <div className="flex gap-2 rounded-xl flex-col bg-neutral-100 dark:bg-neutral-900 p-2">

        <p className="text-sm font-semibold px-2">Detalle de la compra</p>  

        <div className="flex flex-col gap-1">
          {productList.length === 0 ? <ProductCardEmpty /> :
          productList.map(product =>
            <ProductCard
              key={product.Id_producto}
              product={product}>
              <div
                className="flex border-1 rounded-xl overflow-hidden border-neutral-200 dark:border-neutral-700">
                <MinusButton
                  icon="-"
                  quantity={product.Cantidad_compra}
                  action={() => reduceQuantity(product)}
                  deleteAction={() => deleteProduct(product)} />
                <span className="flex justify-center items-center text-xs w-8 py-1">{product.Cantidad_compra}</span>
                <QuantityButton
                  icon="+"
                  action={() => addQuantity(product)} />
              </div>
            </ProductCard>
          )}
        </div>

        {productList.length > 0 && <OrderTotals purchaseTotals={purchaseTotals} />}
      </div>
    </>
  );
}

function ProductCardEmpty() {
  return (
    <p className="flex items-center justify-center text-sm bg-white dark:bg-neutral-800 rounded-xl px-4 py-5 shadow-sm text-neutral-500 dark:text-neutral-400">Este pedido no tiene productos</p>
  );
}

function MinusButton({ quantity, icon, action, deleteAction }) {
  if (quantity === 1) return (
    <button
    className="flex items-center justify-center w-6 text-xs bg-neutral-200 dark:bg-neutral-700"
    type="button"
    onClick={deleteAction}
  >
    <CardDelete className="size-4 ml-0.5" />
  </button>
  );

  return <QuantityButton icon={icon} action={action} />;
}

function QuantityButton({ icon, action }) {
  return (
    <button
      className="w-6 text-xs bg-neutral-200 dark:bg-neutral-700"
      type="button"
      onClick={action}
    >{icon}</button>
  );
}

function OrderTotals({ purchaseTotals }) {
  return (
    <div className="flex justify-end px-2 items-center gap-3">
      <span className="flex flex-col text-xs font-semibold">Productos: {purchaseTotals.items}</span>
      <span className="flex flex-col text-xs font-semibold">Cantidad: {purchaseTotals.quantity}</span>
    </div>
  );
}