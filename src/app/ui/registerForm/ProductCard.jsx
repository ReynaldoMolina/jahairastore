import { ListId, ListName } from "@/app/ui/lists/lists";

export function ProductCard({ children, product, convert, price = 'venta', showProfit, showLeft }) {
  console.log(product);
  
  const prices = {
    venta: 'Precio_venta',
    compra: 'Precio_compra'
  };
  const newPrice = prices[price];

  const precio = convert ? (product[newPrice] * product.Cambio_dolar) : product[newPrice];
  const subtotal = precio * product.Cantidad;
  const ganancia = convert ? ((product.Precio_venta - product.Precio_compra) * product.Cambio_dolar * product.Cantidad) : ((product.Precio_venta - product.Precio_compra) * product.Cambio_dolar);

  return (
    <div
      className="flex items-center gap-2 rounded-xl p-2 bg-white dark:bg-neutral-800 shadow-sm"
    >
      <ListId id={product.Id_producto} />
      <CardInfo>
        <ListName name={product.Nombre} />
        <CardInfoDetail>
          <CardDetail detail={precio} convert={convert} price={price} />
          {children}
          {showLeft && (
          <span className="text-xs min-w-18 text-left sm:text-right text-neutral-400">{
            product.Existencias === 1 ? 'Queda 1' :
            product.Existencias <= 0 ? 'Agotado' : `Quedan ${product.Existencias}`
          }</span>
        )}
        </CardInfoDetail>
      </CardInfo>
      <div className="flex gap-2 flex-col">
        <span className={`text-xs font-bold min-w-19 pr-0.5 text-right ${price === 'compra' ? "text-red-600" : "text-green-600"}`}>{convert ? 'C$' : '$'} {subtotal.toFixed(2)}</span>
        {showProfit && (
          <span className="text-xs font-bold min-w-19 pr-0.5 text-right text-blue-400">{convert ? 'C$' : '$'} {ganancia.toFixed(2)}</span>
        )}
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

export function CardDetail({ detail, convert, price }) {
  const colors = {
    venta: "text-green-600",
    compra: "text-red-600",
  };
  const color = colors[price];
  return (
    <span className={`flex items-center justify-start sm:justify-end text-xs w-16 ${color}`}>{convert ? 'C$' : '$'} {detail.toFixed(2)}</span>
  );
}