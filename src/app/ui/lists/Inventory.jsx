import { getInventory, getInventoryPages } from "@/app/lib/data";
import { List, ListCard, ListId, ListName, ListInfo, ListInfoDetail, ListDetail } from "@/app/ui/lists/lists";
import { Pagination } from "@/app/ui/lists/pagination";
import EmptyList from "@/app/ui/lists/EmptyList";
import { InventoryListTotal } from "./ListTotal";

export default async function Inventory({ query, currentPage }) {
  const data = await getInventory(query, currentPage);
  const totalPages = await getInventoryPages(query);

  if (data.length === 0) return <EmptyList query={query}/>

  return (
    <List>
      {data.map(register => (
        <ListCard
          href={`/productos/${register.Id}`}
          key={register.Id}
        >
          <ListId id={register.Id}/>
          <ListInfo>
            <ListName name={register.Nombre} />
              <ListInfoDetail>
                <ListDetail detail={register.TotalCompraCantidad} color="green" type="text" />
                <ListDetail detail={register.TotalVentaCantidad} color="red" type="text" />
                <ListDetail detail={register.Existencias} color="blue" type="text" />
                <ListDetail detail={register.Ganancia} color="blue" />
              </ListInfoDetail>
          </ListInfo>
        </ListCard>
      ))}
      <InventoryListTotal data={data} />
      <Pagination totalPages={totalPages} />
    </List>
  );
}