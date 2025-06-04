import EmptyList from "@/app/ui/lists/EmptyList";
import { getProductsInventario, getProductsInventarioPages } from "@/app/lib/data";
import { ListInfo, ListId, ListInfoDetail, ListDetail, ListName } from "@/app/ui/lists/lists";
import { Pagination } from "@/app/ui/lists/pagination";
import AddProduct from "./AddProduct";

export default async function ProductSearchList({ searchParams }) { 
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await getProductsInventarioPages(query);
  const data = await getProductsInventario(query, currentPage);

  return (
    <div className={`flex max-h-70 flex-col grow overflow-y-scroll gap-1 rounded-xl`}>
      {data.length === 0 && <EmptyList query={query} />}
      {data.map((product) => {
        return (
          <div
            key={product.Id_producto}
            className="flex rounded-xl bg-white dark:bg-neutral-800 p-2 items-center shadow-xs gap-2 hover:bg-sky-100 dark:hover:bg-neutral-700/80"
          >
            <ListId id={product.Id_producto} />
            <ListInfo>
              <ListName name={product.Nombre} />
              <ListInfoDetail>
                <ListDetail detail={product.Precio_venta * product.Cambio_dolar} color="bg-green-200 dark:bg-green-900 text-right" type="number" />
                <ListDetail detail={product.Precio_compra * product.Cambio_dolar} color="bg-red-200 dark:bg-red-900 text-right" type="number" />
              </ListInfoDetail>
            </ListInfo>
            <AddProduct product={product} />
          </div>
        )
      })}
      <Pagination totalPages={totalPages} />
    </div>
  );
}