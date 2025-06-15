import { ListId, ListName } from "@/app/ui/lists/lists";

export function ProductCard({ children, product, convert, showLeft, price }) {
  const prices = {
    venta: "Precio_venta",
    compra: "Precio_compra"
  }

  const priceToShow = convert ? product[prices[price]] * product.Cambio_dolar : product[prices[price]];
  const precioVenta = convert ? (product.Precio_venta * product.Cambio_dolar) : product.Precio_venta;
  const precioCompra = convert ? (product.Precio_compra * product.Cambio_dolar) : product.Precio_compra;
  const subtotalVenta = precioVenta * product.Cantidad;
  const subtotalCompra = precioCompra * product.Cantidad;
  const ganancia = subtotalVenta - subtotalCompra;

  return (
    <div
      className="flex gap-2 items-center rounded-xl p-2 bg-white dark:bg-neutral-800 shadow-sm"
    >
      <ListId id={product.Id_producto} />
      <CardInfo>
        <ListName name={product.Nombre} />
        <CardInfoDetail>
          <CardDetail detail={priceToShow} convert={convert} color={price === 'venta' ? "green" : "red"} />
          {children}
          {showLeft && (
          <span className="text-xs min-w-18 text-left sm:text-right text-neutral-500 dark:text-neutral-400">{
            product.Existencias === 1 ? 'Queda 1' :
            product.Existencias <= 0 ? 'Agotado' : `Quedan ${product.Existencias}`
          }</span>
        )}
        </CardInfoDetail>
      </CardInfo>
      <div className="flex gap-2 flex-col justify-center">
        <span className="text-xs font-bold min-w-19 pr-0.5 text-right text-green-600 dark:text-green-500">{convert ? 'C$' : '$'} {subtotalVenta.toFixed(2)}</span>
        <span className="text-xs font-bold min-w-19 pr-0.5 text-right text-red-600 dark:text-red-400">{convert ? 'C$' : '$'} {subtotalCompra.toFixed(2)}</span>
        <span className="text-xs font-bold min-w-19 pr-0.5 text-right text-blue-500 dark:text-blue-300">{convert ? 'C$' : '$'} {ganancia.toFixed(2)}</span>
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

export function CardDetail({ detail, convert, color }) {
  const colors = {
    green: "text-green-600 dark:text-green-500",
    red: "text-red-600 dark:text-red-400",
    blue: "text-blue-600 dark:text-blue-400",
  };

  return (
    <span className={`flex items-center justify-start sm:justify-end text-xs w-16 ${colors[color]}`}>{convert ? 'C$' : '$'} {detail.toFixed(2)}</span>
  );
}