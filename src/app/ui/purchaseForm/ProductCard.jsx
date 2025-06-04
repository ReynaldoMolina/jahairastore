import { ListId, ListName } from "@/app/ui/lists/lists";

export function ProductCard({ product, children }) {
  const subtotal = (product.Precio_compra * product.Cantidad_compra * product.Cambio_dolar).toFixed(2);
  return (
    <div
      className="flex items-center gap-2 rounded-xl p-2 bg-white dark:bg-neutral-800 shadow-sm"
    >
      <ListId id={product.Id_producto} />
      <CardInfo>
        <ListName name={product.Nombre} />
        <CardInfoDetail>
          <CardDetail detail={product.Precio_compra * product.Cambio_dolar} />
          {children}
        </CardInfoDetail>
      </CardInfo>
      <span className="text-xs font-bold min-w-19 pr-0.5 text-right">C$ {subtotal}</span>
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
    <div className="flex justify-start gap-2 sm:gap-3 flex-wrap sm:flex-nowrap">
      {children}
    </div>
  );
}

export function CardDetail({ detail }) {
  return (
    <span className="flex items-center justify-start sm:justify-end text-xs w-17">C$ {detail.toFixed(2)}</span>
  );
}