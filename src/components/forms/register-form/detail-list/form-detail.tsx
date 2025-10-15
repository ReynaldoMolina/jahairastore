'use client';

import { RegisterDetailListHeader } from '@/components/lists/list-header';
import { RegisterListTotal } from '@/components/lists/list-total';
import { bgColors } from '@/lib/bg-colors';
import { useFormContext } from '../../register';
import { ProductCard } from './product-card';
import { List } from '@/components/lists/lists';

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

  const subtitleOptions = {
    ventas: 'de la venta',
    compras: 'de la compra',
    pedidos: 'del pedido',
  };

  const options = registerOptions[formName];
  const subtitle = subtitleOptions[formName];

  return (
    <div
      className={`flex flex-col rounded-lg bg-neutral-100 dark:bg-black border ${bgColors.borderColor} px-2 py-3 gap-3`}
    >
      <h2 className="text-sm font-semibold">{`Detalle ${subtitle}`}</h2>

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
