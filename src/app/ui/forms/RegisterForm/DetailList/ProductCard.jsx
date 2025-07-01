import { ListId, ListName } from '@/app/ui/lists/lists';
import { ChangeQuantity } from './ChangeQuantity';
import { useFormContext } from '@/app/ui/forms/RegisterForm';
import { useState } from 'react';
import { calculateTotals } from '@/app/lib/calculateTotals';

export function ProductCard({
  product,
  convert,
  showLeft,
  price,
  overrideLeft,
}) {
  const { Precio_venta, Precio_compra, Cambio_dolar, Cantidad } = product;
  const factor = convert ? Cambio_dolar : 1;
  const subtotalVenta = Precio_venta * factor * Cantidad;
  const subtotalCompra = Precio_compra * factor * Cantidad;
  const ganancia = subtotalVenta - subtotalCompra;

  return (
    <div className="flex gap-2 items-center rounded-xl p-2 bg-white dark:bg-neutral-800 shadow-sm">
      <ListId id={product.Id_producto} />
      <CardInfo>
        <ListName name={product.Nombre} />
        <CardInfoDetail>
          <CardPrice product={product} price={price} convert={convert} />
          <ChangeQuantity
            product={product}
            overrideLeft={overrideLeft}
            convert={convert}
          />
          {showLeft && (
            <span className="text-xs min-w-18 text-left sm:text-right text-neutral-500 dark:text-neutral-400">
              {product.Existencias === 1
                ? 'Queda 1'
                : product.Existencias <= 0
                ? 'Agotado'
                : `Quedan ${product.Existencias}`}
            </span>
          )}
        </CardInfoDetail>
      </CardInfo>
      <div className="flex gap-2 flex-col justify-center">
        <span className="text-xs font-bold min-w-19 pr-0.5 text-right text-green-600 dark:text-green-500">
          {convert ? 'C$' : '$'} {subtotalVenta.toFixed(2)}
        </span>
        <span className="text-xs font-bold min-w-19 pr-0.5 text-right text-red-600 dark:text-red-400">
          {convert ? 'C$' : '$'} {subtotalCompra.toFixed(2)}
        </span>
        <span className="text-xs font-bold min-w-19 pr-0.5 text-right text-blue-500 dark:text-blue-300">
          {convert ? 'C$' : '$'} {ganancia.toFixed(2)}
        </span>
      </div>
    </div>
  );
}

function CardInfo({ children }) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center grow gap-2">
      {children}
    </div>
  );
}

function CardInfoDetail({ children }) {
  return (
    <div className="flex justify-start items-center gap-2 sm:gap-3 flex-wrap sm:flex-nowrap">
      {children}
    </div>
  );
}

export function CardPrice({ product, price, convert }) {
  const { productList, setProductList, setFormTotals } = useFormContext();

  const prices = {
    venta: 'Precio_venta',
    compra: 'Precio_compra',
  };

  const priceToShow = convert
    ? product[prices[price]] * product.Cambio_dolar
    : product[prices[price]];
  const [priceNio, setPriceNio] = useState(Math.round(priceToShow * 100) / 100);
  const color = price === 'venta' ? 'green' : 'red';

  const colors = {
    green: 'text-green-600 dark:text-green-500',
    red: 'text-red-600 dark:text-red-400',
    blue: 'text-blue-600 dark:text-blue-400',
  };

  function findId() {
    const index = productList.findIndex(
      (e) => e.Id_producto === product.Id_producto
    );
    return index;
  }

  function handleChange(newPrice) {
    const newList = productList.map((item, idx) =>
      idx === findId(product)
        ? {
            ...item,
            [prices[price]]: newPrice / product.Cambio_dolar,
          }
        : item
    );
    setPriceNio(newPrice);
    setProductList(newList);
    setFormTotals(calculateTotals(newList, convert));
  }

  return (
    <div
      className={`flex items-center justify-start sm:justify-end text-xs w-20 gap-1 ${colors[color]}`}
    >
      {convert ? 'C$' : '$'}
      <input
        name="priceNio"
        type="number"
        className="w-full border-b text-center py-1"
        step="0.01"
        value={priceNio}
        onChange={(event) => handleChange(event.target.value)}
        placeholder="precio"
      ></input>
    </div>
  );
}
