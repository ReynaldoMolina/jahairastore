'use client';

import { ProductCard } from "@/app/ui/registerForm/ProductCard";
import CardDelete from "@/app/ui/icons/delete.svg";
import { calculateTotals } from "@/app/lib/calculateTotals";
import { useFormContext } from "@/app/ui/forms/RegisterForm";

export default function FormDetail({ convert = false, price, showProfit = false, showLeft = false }) {
  const { productList, setProductList, formTotals, setFormTotals } = useFormContext();

  function findId(product) {
    const index = productList.findIndex((e) => e.Id === product.Id);
    return index;
  }

  function addQuantity(product) {
    const newList = productList.map((item, idx) =>
      idx === findId(product) ? {
        ...item,
        Cantidad: item.Cantidad + 1,
        Existencias: item.Existencias - 1
      } : item
    )
    setProductList(newList);
    setFormTotals(calculateTotals(newList, convert));
  }

  function reduceQuantity(product) {
    const newList = productList.map((item, idx) =>
      idx === findId(product) ? {
        ...item,
        Cantidad: item.Cantidad - 1,
        Existencias: item.Existencias + 1
      } : item
    )
    setProductList(newList);
    setFormTotals(calculateTotals(newList, convert));
  }

  function deleteProduct(product) {
    const newList = productList.filter(e => e.Id !== product.Id);
    setProductList(newList);
    setFormTotals(calculateTotals(newList, convert));
  }

  return (
    <>
      <div className="flex gap-2 rounded-xl flex-col bg-neutral-100 dark:bg-neutral-900 p-2">

        <p className="text-sm font-semibold px-2">Detalle</p>  

        <div className="flex flex-col gap-1">
          {productList.length === 0 ? <ProductCardEmpty /> :
          productList.map(product =>
            <ProductCard
              key={product.Id_producto}
              product={product}
              convert={convert}
              price={price}
              showProfit={showProfit}
              showLeft={showLeft}>
              <div
                className="flex border-1 rounded-xl overflow-hidden border-neutral-200 dark:border-neutral-700">
                <MinusButton
                  icon="-"
                  quantity={product.Cantidad}
                  action={() => reduceQuantity(product)}
                  deleteAction={() => deleteProduct(product)} />
                <span className="flex justify-center items-center text-xs w-8 py-1">{product.Cantidad}</span>
                <QuantityButton
                  icon="+"
                  action={() => addQuantity(product)} />
              </div>
            </ProductCard>
          )}
        </div>

        {productList.length > 0 && <FormTotals formTotals={formTotals} />}
      </div>
    </>
  );
}

function ProductCardEmpty() {
  return (
    <p className="flex items-center justify-center text-sm bg-white dark:bg-neutral-800 rounded-xl px-4 py-5 shadow-sm text-neutral-500 dark:text-neutral-400">No hay productos en el detalle</p>
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

function FormTotals({ formTotals }) {
  return (
    <div className="flex justify-end px-2 items-center gap-3">
      <span className="flex flex-col text-xs font-semibold">Productos: {formTotals.items}</span>
      <span className="flex flex-col text-xs font-semibold">Cantidad: {formTotals.quantity}</span>
    </div>
  );
}