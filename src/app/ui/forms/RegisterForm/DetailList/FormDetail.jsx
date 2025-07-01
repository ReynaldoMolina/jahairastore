'use client';

import { ProductCard } from '@/app/ui/forms/RegisterForm/DetailList/ProductCard';
import { useFormContext } from '@/app/ui/forms/RegisterForm';

export default function FormDetail({
  convert = false,
  showLeft = false,
  overrideLeft = true,
  price = 'venta',
}) {
  const { productList, formTotals } = useFormContext();

  return (
    <>
      <div className="flex gap-2 rounded-xl flex-col bg-neutral-100 dark:bg-neutral-900 p-2">
        <p className="text-sm font-semibold px-2">Detalle</p>

        <div className="flex flex-col gap-1">
          {productList.length === 0 ? (
            <ProductCardEmpty />
          ) : (
            productList.map((product) => (
              <ProductCard
                key={product.Id_producto}
                product={product}
                convert={convert}
                showLeft={showLeft}
                price={price}
                overrideLeft={overrideLeft}
              />
            ))
          )}
        </div>

        {productList.length > 0 && <FormTotals formTotals={formTotals} />}
      </div>
    </>
  );
}

function ProductCardEmpty() {
  return (
    <p className="flex items-center justify-center text-sm bg-white dark:bg-neutral-800 rounded-xl px-4 py-5 shadow-sm text-neutral-500 dark:text-neutral-400">
      No hay productos en el detalle
    </p>
  );
}

function FormTotals({ formTotals }) {
  return (
    <div className="flex justify-end px-2 items-center gap-3">
      <span className="flex flex-col text-xs font-semibold">
        Productos: {formTotals.items}
      </span>
      <span className="flex flex-col text-xs font-semibold">
        Cantidad: {formTotals.quantity}
      </span>
    </div>
  );
}
