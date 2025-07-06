'use client';

import { ProductCard } from '@/app/ui/forms/RegisterForm/DetailList/ProductCard';
import { useFormContext } from '@/app/ui/forms/RegisterForm';
import { bgColors } from '@/app/ui/bgcolors';
import { List } from '@/app/ui/lists/lists';
import { RegisterDetailListHeader } from '@/app/ui/lists/ListHeader';
import { RegisterListTotal } from '@/app/ui/lists/ListTotal';

export default function FormDetail({
  convert = false,
  showLeft = false,
  overrideLeft = true,
  price = 'venta',
}) {
  const { productList, formTotals } = useFormContext();

  return (
    <div
      className={`flex flex-col rounded-lg bg-neutral-100 dark:bg-black border ${bgColors.borderColor} px-2 py-3 gap-3`}
    >
      <div className="flex justify-between">
        <p className="text-sm font-semibold px-1">Detalle del pedido</p>
        {productList.length > 0 && (
          <span className="flex flex-col text-xs font-semibold">
            Cantidad: {formTotals.quantity}
          </span>
        )}
      </div>

      {productList.length === 0 ? (
        <ProductCardEmpty />
      ) : (
        <List>
          <RegisterDetailListHeader showLeft={showLeft} />
          {productList.map((product) => (
            <ProductCard
              key={product.Id_producto}
              product={product}
              convert={convert}
              showLeft={showLeft}
              price={price}
              overrideLeft={overrideLeft}
            />
          ))}
          <RegisterListTotal
            formTotals={formTotals}
            productList={productList}
          />
        </List>
      )}
    </div>
  );
}

function ProductCardEmpty() {
  return (
    <p className="flex items-center justify-center text-sm bg-white dark:bg-neutral-800 rounded-lg px-4 py-5 shadow-xs text-neutral-500 dark:text-neutral-400">
      No hay productos en el detalle
    </p>
  );
}
