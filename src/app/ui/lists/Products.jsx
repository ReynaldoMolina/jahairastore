import { getProducts, getProductsPages } from "@/app/lib/data";
import { List, ListCard, ListId, ListName, ListInfo, ListInfoDetail, ListDetail } from "@/app/ui/lists/lists";
import { Pagination } from "@/app/ui/lists/pagination";
import EmptyList from "@/app/ui/lists/EmptyList";

export default async function Products({ query, currentPage }) {
  const data = await getProducts(query, currentPage);
  const totalPages = await getProductsPages(query);

  if (data.length === 0) return <EmptyList query={query}/>

  return (
    <List>
      {data.map(register => (
        <ListCard
          key={register.Id}
          href={`/productos/${register.Id}`}
        >
          <ListId id={register.Id}/>
          <ListInfo>
            <ListName name={register.Nombre} />
              <ListInfoDetail>
                <ListDetail detail={register.Precio_venta} color="green" />
                <ListDetail detail={register.Precio_compra} color="red" />
                <ListDetail detail={register.Ganancia} color="blue" />
              </ListInfoDetail>
          </ListInfo>
        </ListCard>
      ))}
      <Pagination totalPages={totalPages} />
    </List>
  );
}