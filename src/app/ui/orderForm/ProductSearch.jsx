import EmptyList from "@/app/ui/lists/EmptyList";
import { getProducts } from "@/app/lib/data";
import { ListInfo, ListId, ListInfoDetail, ListDetail, ListName } from "@/app/ui/lists/lists";
import { Pagination } from "@/app/ui/lists/pagination";
import { getProductsPages } from "@/app/lib/data";
import SearchInput from "../ActionTools/SeachInput";
import AddProduct from "./AddProduct";

export default async function ProductSearch({searchParams}) { 
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await getProductsPages(query);
  const data = await getProducts(query, currentPage);

  return (
    <div className="flex flex-col gap-2 bg-neutral-100 dark:bg-neutral-800 rounded-xl p-2 cursor-pointer">
      <div className="flex flex-center product-search">
        <SearchInput />

        {/* <OpenProductSearch isSearchProductOpen={isSearchProductOpen} setIsSearchProductOpen={setIsSearchProductOpen}/> */}
      </div>

      <div className={`flex h-60 flex-col grow overflow-y-scroll gap-1 rounded-xl`}>
        {data.length === 0 && <EmptyList query={query} />}
        {data.map((register) => {
          // const isInList = productList.some(p => p.productId === register.id);
          return (
            <div
              key={register.Id_producto}
              className="flex rounded-xl bg-white dark:bg-neutral-700 p-2 items-center shadow-xs gap-2 hover:bg-sky-100 dark:hover:bg-neutral-600/80"
            >
              <ListId id={register.Id_producto} />
              <ListInfo>
                <ListName name={register.Nombre} />
                <ListInfoDetail>
                  <ListDetail detail={register.Precio_venta} color="bg-green-300 dark:bg-green-700 text-right" type="number" />
                  <ListDetail detail={register.Precio_compra} color="bg-red-300 dark:bg-red-700 text-right" type="number" />
                </ListInfoDetail>
              </ListInfo>
              <AddProduct id={register.Id_producto} />
            </div>
          )
        })}
      </div>

      <Pagination totalPages={totalPages} />
    </div>
  );
}