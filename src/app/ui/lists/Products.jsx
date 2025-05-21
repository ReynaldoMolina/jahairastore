import { getProducts } from "@/app/lib/data";
import { List, ListCard, ListId, ListName, ListInfo, ListInfoDetail, ListDetail } from "@/app/ui/lists/lists";
import EmptyList from "@/app/ui/lists/EmptyList";

export default async function Products({ query, currentPage }) {
  const data = await getProducts(query, currentPage);

  if (data.length === 0) return <EmptyList query={query}/>

  return (
    <List>
      {data.map(register => (
        <ListCard
          key={register.Id_producto}
          href={`/products/${register.Id_producto}/edit`}
        >
          <ListId id={register.Id_producto}/>
          <ListInfo>
            <ListName name={register.Nombre} />
              <ListInfoDetail>
                <ListDetail detail={register.Precio_venta} color="bg-green-200 dark:bg-green-900 text-right" type="number" />
                <ListDetail detail={register.Precio_compra} color="bg-red-200 dark:bg-red-900 text-right" type="number" />
                <ListDetail detail={register.Ganancia} color="bg-blue-200 dark:bg-blue-900 text-right" type="number" />
              </ListInfoDetail>
          </ListInfo>
        </ListCard>
      ))}
    </List>
  );
}