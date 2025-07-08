'use client';

import { ProductCard } from '@/app/ui/forms/RegisterForm/DetailList/ProductCard';
import { useFormContext } from '@/app/ui/forms/RegisterForm';
import { bgColors } from '@/app/ui/bgcolors';
import { List } from '@/app/ui/lists/lists';
import { RegisterDetailListHeader } from '@/app/ui/lists/ListHeader';
import { RegisterListTotal } from '@/app/ui/lists/ListTotal';

export default function FormDetail() {
  const { productList, formTotals, formName } = useFormContext();

  const registerOptions = {
    ventas: {
      inventario: true,
      convert: true,
      price: 'venta',
      overrideLeft: false,
    },
    compras: {
      inventario: true,
      convert: true,
      price: 'compra',
      overrideLeft: true,
    },
    pedidos: {
      inventario: false,
      convert: false,
      price: 'venta',
      overrideLeft: true,
    },
  };
  const options = registerOptions[formName];

  return (
    <div
      className={`flex flex-col rounded-lg bg-neutral-100 dark:bg-black border ${bgColors.borderColor} px-2 py-3 gap-3`}
    >
      <h2 className="text-sm font-semibold">Detalle del pedido</h2>

      {productList.length === 0 ? (
        <ProductCardEmpty />
      ) : (
        <List>
          <RegisterDetailListHeader />
          {productList.map((product) => (
            <ProductCard
              key={product.Id_producto}
              product={product}
              convert={options.convert}
              price={options.price}
              overrideLeft={options.overrideLeft}
            />
          ))}
          <RegisterListTotal
            formTotals={formTotals}
            productList={productList}
            convert={options.convert}
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
