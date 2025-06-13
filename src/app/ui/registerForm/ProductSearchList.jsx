import EmptyList from "@/app/ui/lists/EmptyList";
import { getProducts, getProductsPages, getProductsInventario, getProductsInventarioPages } from "@/app/lib/data";
import { ListInfo, ListId, ListInfoDetail, ListDetail, ListName } from "@/app/ui/lists/lists";
import { Pagination } from "@/app/ui/lists/pagination";
import AddProduct from "./AddProduct";

export default async function ProductSearchList({ searchParams, inventario = false }) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  const totalPages = inventario
    ? await getProductsInventarioPages(query)
    : await getProductsPages(query, false, false);

  const data = inventario
    ? await getProductsInventario(query, currentPage)
    : await getProducts(query, currentPage, false, false);

  return (
    <div className={`flex flex-col grow overflow-y-scroll gap-1 rounded-xl`}>
      {data.length === 0 && <EmptyList query={query} />}
      {data.map((product) => {
        const precioVenta = inventario ? (product.Precio_venta * product.Cambio_dolar) : product.Precio_venta;
        const precioCompra = inventario ? (product.Precio_compra * product.Cambio_dolar) : product.Precio_compra;

        return (
          <div
            key={product.Id}
            className="flex rounded-xl bg-white dark:bg-neutral-800 p-2 items-center shadow-xs gap-2 hover:bg-sky-100 dark:hover:bg-neutral-700/80"
          >
            <ListId id={product.Id} />
            <ListInfo>
              <ListName name={product.Nombre} />
              <ListInfoDetail>
                <ListDetail detail={precioVenta} color="green" />
                <ListDetail detail={precioCompra} color="red" />
                {inventario &&
                  <ListDetail detail={`Cant ${product.Existencias}`} type="text" />
                }
              </ListInfoDetail>
            </ListInfo>
            <AddProduct product={product} convert={inventario} />
          </div>
        )
      })}
      <Pagination totalPages={totalPages} />
    </div>
  );
}