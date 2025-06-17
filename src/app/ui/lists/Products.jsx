import { getProducts, getProductsPages } from "@/app/lib/data";
import { List, ListCard, ListId, ListName, ListInfo, ListInfoDetail, ListDetail, NameDateDiv, ListDate } from "@/app/ui/lists/lists";
import { Pagination } from "@/app/ui/lists/pagination";
import EmptyList from "@/app/ui/lists/EmptyList";
import { ProductListHeader } from "./ListHeader";

export default async function Products({ query, currentPage }) {
  const data = await getProducts(query, currentPage);
  const totalPages = await getProductsPages(query);

  if (data.length === 0) return <EmptyList query={query}/>

  return (
    <List>
      <ProductListHeader />
      {data.map(register => (
        <ListCard
          key={register.Id}
          href={`/productos/${register.Id}`}
        >
          <ListId id={register.Id}/>
          <ListInfo>
            <NameDateDiv>
              <ListName name={register.Nombre} />
              <ListDate date={register.Fecha} />
            </NameDateDiv>
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