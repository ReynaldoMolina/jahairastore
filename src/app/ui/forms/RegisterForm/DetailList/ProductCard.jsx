import {
  ListId,
  ListName,
  ListDetail,
  ListInfoDetail,
} from '@/app/ui/lists/lists';
import { ChangeQuantity } from './ChangeQuantity';
import { useFormContext } from '@/app/ui/forms/RegisterForm';
import { useState } from 'react';
import { calculateTotals } from '@/app/lib/calculateTotals';
import { bgColors } from '@/app/ui/bgcolors';

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
    <div className="flex flex-col md:flex-row items-start p-4 gap-3 md:border-t first-of-type:border-t-0 border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 rounded-lg md:rounded-none shadow md:shadow-none">
      <CardInfo>
        <ListId id={product.Id_producto} label="ID PRODUCTO" />
        <ListName name={product.Nombre} />
      </CardInfo>
      <ListInfoDetail>
        <CardDetail label="Precio">
          <CardPrice product={product} price={price} convert={convert} />
        </CardDetail>
        <CardDetail label="Cantidad">
          <ChangeQuantity
            product={product}
            overrideLeft={overrideLeft}
            convert={convert}
          />
        </CardDetail>
        <RemainingStock showLeft={showLeft} product={product} />
        <ListDetail detail={subtotalVenta} label="Venta" color="green" />
        <ListDetail detail={subtotalCompra} label="Compra" color="red" />
        <ListDetail detail={ganancia} label="Ganancia" color="blue" />
      </ListInfoDetail>
    </div>
  );
}

function CardInfo({ children }) {
  return (
    <div className="flex flex-col md:flex-row w-full items-start grow gap-1 md:gap-4 pb-2 md:pb-0 border-b md:border-b-0 border-neutral-300 dark:border-neutral-700">
      {children}
    </div>
  );
}

function CardPrice({ product, price, convert }) {
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
      className={`flex items-center justify-start sm:justify-end text-xs w-27 md:w-20 gap-1 ${colors[color]}`}
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

function RemainingStock({ showLeft, product }) {
  if (!showLeft) return;
  const remainig = product.Existencias <= 0 ? 'Agotado' : product.Existencias;
  const bgColor = bgColors['gray'];

  return (
    <div className="flex w-full md:w-auto items-center justify-between gap-1 relative">
      <span className="md:hidden text-neutral-500 dark:text-neutral-400 text-xs w-18">
        Quedan
      </span>
      <span
        className={`rounded-xl py-1 px-2 text-xs min-w-25 text-right ${bgColor}`}
      >
        {remainig}
      </span>
    </div>
  );
}

function CardDetail({ children, label }) {
  return (
    <div className="flex w-full md:w-auto items-center justify-between gap-1 relative">
      <span className="md:hidden text-neutral-500 dark:text-neutral-400 text-xs w-18">
        {label}:
      </span>
      {children}
    </div>
  );
}
